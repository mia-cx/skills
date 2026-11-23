---
name: webmcp
description: 'Use when making a website or web app usable by AI agents: exposing its actions as WebMCP tools (`document.modelContext`, `toolname` forms), or reviewing a site for agent navigability.'
---

# WebMCP

WebMCP lets a page hand browser agents a list of **tools**: named actions with a description and a JSON Schema, run by the page's own code. The agent calls `add-to-cart` instead of guessing at screenshots and clicks, and the user watches the UI change. One page can expose tools two ways: annotated HTML forms (declarative) and `document.modelContext.registerTool()` (imperative).

It is a W3C Community Group draft that is still changing. As of November 2026 it runs in a Chrome 149 and Edge 150 origin trial and in ChatGPT Desktop; Brave's Leo follows in January 2027, and Firefox and Safari have no position yet. Check [implementation status](https://github.com/webmachinelearning/webmcp/blob/main/implementation-status.md) before you promise a browser. Build every tool as **progressive enhancement**, because most visitors' browsers lack the API.

This skill covers agents acting on a page the user has open. Getting crawled, recommended and cited by AI search is [seo-ai-search](../seo-ai-search/SKILL.md).

## Steps

1. **Read the baseline.** Agents without WebMCP navigate through the accessibility tree, and the declarative API builds its schema from form labels, so semantic, labelled markup comes first. Check it against [ui-a11y](../ui-a11y/SKILL.md). Done when every control the tools will touch has an accessible name and every form field has a `name` and a `<label>`.
2. **List the journeys.** Write down what a user comes to do on each page state, as verbs: search, filter, add to cart, book, export. Each verb is one candidate tool. Done when every candidate maps to something a person can already do in the UI, and no two overlap.
3. **Annotate forms.** Each `<form>` that performs a listed verb becomes a declarative tool ([Declarative](#declarative-forms)). Done when every such form has `toolname` and `tooldescription`.
4. **Register the rest.** Verbs that are not a single form submission (reading app state, multi-step edits, filtering a client-side list) become imperative tools that call the same service the UI calls ([Imperative](#imperative-tools)). Done when every remaining candidate is registered for exactly the page states where it works, and every write tool carries its annotations ([Security](#security)).
5. **Run every tool.** In Chrome with `chrome://flags/#enable-webmcp-testing` on, open DevTools → Application → WebMCP. Run each tool from **Available Tools** with valid input, then with bad input. Then give a real agent a plain-language task with the [Model Context Tool Inspector](https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd) extension or [webmcp-extension](https://github.com/GoogleChromeLabs/webmcp-extension). Done when each tool succeeds, bad input returns a message the agent fixes on retry, the UI shows every change, and the agent picks the right tool unprompted.
6. **Ship.** Register the site in the [origin trial](https://developer.chrome.com/origintrials/#/register_trial/4163014905550602241) and serve its token in `<meta http-equiv="origin-trial" content="…">` or an `Origin-Trial` header. The API exists only in secure contexts (HTTPS or localhost).

## Tool design

Every tool's name, description and schema sit in the agent's context for every turn, so each one costs tokens and adds a chance to pick the wrong tool.

- **Budget.** Register a handful of tools per page state, not a catalogue. Keep names under 30 characters, tool descriptions under 500, parameter descriptions under 150, and output under 1.5K, because agents may drop tools past their limits.
- **Names** are kebab-case verb-noun: `search-flights`, `add-to-cart`. The verb separates doing from starting: `create-event` books it now, `start-event-creation` opens the form.
- **Descriptions** say what the tool does and when to reach for it, in positive terms. Describe the outcome; the agent plans the sequence.
- **Inputs** take what the user would say. Accept "next Friday", "size 38", "London"; normalise dates, units and time zones in code. Use natural-language enum values (`"express"`, not `3`) and give every property a `description`.
- **Validate in code, loosely in schema.** A strict schema stalls an agent that sends a near miss; `execute` checks input, auth and current state, because the page may have changed since the agent read the schema.
- **Return recoverable errors; reserve throwing for bugs.** A rejected promise reaches the agent as a bare `OperationError` with your message stripped. For bad input, a rate limit or a missing login, resolve with the fix: `"No flights on 2026-02-30. Pick a date in February 2026 (1–28)."`
- **Output** is any JSON-serialisable value. Return a short sentence or small object stating what changed and the new state the agent needs next (`{ added: "Linen dress", cartCount: 3 }`), never the whole page model.
- **Sync the UI.** The tool updates the same state the UI renders, so the user sees every agent action as it happens.
- **Re-register to change metadata.** The agent caches name, description and schema. Abort and re-register when they change; the `execute` body may change freely.

## Declarative forms

```html
<form toolname="search-flights" tooldescription="Searches flights and shows the results on this page." toolautosubmit>
  <label>From <input name="origin" required></label>
  <label>To <input name="destination" required></label>
  <select name="cabin" toolparamdescription="Cabin class.">
    <option value="economy">Economy</option>
    <option value="business">Business</option>
  </select>
</form>
```

- Each field's `name` becomes a schema property; `required` carries over. A parameter's description comes from `toolparamdescription`, else its `<label>`, else `aria-description`. A `<select>` becomes an enum of its option values, titled by their text.
- Add `toolautosubmit` only to forms that are safe to submit unreviewed, such as search and filter. Without it, the browser fills the form, focuses submit, and the user clicks.
- Style the agent-filled state with `form:tool-form-active` and `:tool-submit-active` so the user sees what is waiting for them.
- Answer without navigating by handling `submit`: call `preventDefault()`, then `respondWith()` when `e.agentInvoked` is true.

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const results = runSearch(new FormData(form));
  if (e.agentInvoked) e.respondWith(results.then((r) => `Showing ${r.length} flights.`));
});
```

## Imperative tools

Feature-detect, register with an `AbortSignal`, and abort when the page state that makes the tool valid ends. Add [`webmcp-types`](https://www.npmjs.com/package/webmcp-types) to `compilerOptions.types`; `registerTool` then infers `execute`'s arguments from `inputSchema`. One helper covers every framework:

```ts
// $lib/webmcp.ts
/** Registers a WebMCP tool when the browser supports it; returns its unregister function. */
export function exposeTool<const I extends object = object, const O extends object = object>(
  tool: WebMCP.ModelContextToolFromSchema<I, O>,
): () => void {
  const context = document.modelContext;
  if (!context) return () => {};
  const registration = new AbortController();
  context
    .registerTool(tool, { signal: registration.signal })
    .catch((error) => console.warn(`WebMCP tool ${tool.name} not registered`, error));
  return () => registration.abort();
}
```

In Svelte 5, `$effect` runs client-only and its return value is the cleanup, so the tool lives exactly as long as the component. Reactive state read in the definition re-registers the tool when it changes, which is the re-registration rule above:

```svelte
<script lang="ts">
  import { exposeTool } from '$lib/webmcp';
  import { cart } from '$lib/cart.svelte';

  $effect(() =>
    exposeTool({
      name: 'add-to-cart',
      description: 'Adds a product to the cart by SKU and returns the new item count.',
      inputSchema: {
        type: 'object',
        properties: {
          sku: { type: 'string', description: 'Product SKU shown on the product card.' },
          quantity: { type: 'integer', description: 'How many to add. Defaults to 1.' },
        },
        required: ['sku'],
      },
      async execute({ sku, quantity = 1 }) {
        const result = await cart.add(sku, quantity);
        return result.ok ? { added: result.title, cartCount: result.count } : result.reason;
      },
    }),
  );
</script>
```

React has [`use-webmcp-tool`](https://www.npmjs.com/package/use-webmcp-tool); Angular and Vue ship their own integrations. Put route-scoped tools in the route's component and app-wide tools (search, navigation) in the root layout.

## Security

An agent carries the user's session, so every tool acts as the user.

- **Annotate.** `readOnlyHint: true` on tools that only read; `consequentialHint: true` on irreversible or real-world actions (paying, sending, deleting, booking) so the agent asks the user first; `untrustedContentHint: true` on tools whose output includes user-generated or third-party text, which may carry prompt injection.
- **Authorise in `execute`.** The tool calls the same server endpoints the UI does, under the same checks. A tool's presence grants nothing.
- **Exposure.** Tools reach the browser's built-in agent and same-origin frames by default. Share with a cross-origin frame only by listing it in `exposedTo`, and only origins you would hand the user's data or actions to directly. A cross-origin iframe registers tools only with `allow="tools"`.
- **Keep metadata factual.** Descriptions and outputs enter the model's context verbatim; anything instruction-shaped in them reads as an attack.

## Spec-only proposals

The explainers describe features no browser ships yet: continuation tokens for tools that span navigations, `requestUserInteraction()`, `updateTool()`, and service-worker tools. Check [implementation status](https://github.com/webmachinelearning/webmcp/blob/main/implementation-status.md) before you build on one. Until continuations ship, a tool that navigates ends its call without a result, so finish the tool's work on the current page or describe it as starting a flow.

## Sources

- [Explainer](https://github.com/webmachinelearning/webmcp) and [specification](https://webmachinelearning.github.io/webmcp/)
- Chrome: [overview](https://developer.chrome.com/docs/ai/webmcp), [best practices](https://developer.chrome.com/docs/ai/webmcp/best-practices), [secure tools](https://developer.chrome.com/docs/ai/webmcp/secure-tools), [declarative API](https://developer.chrome.com/docs/ai/webmcp/declarative-api), [DevTools](https://developer.chrome.com/docs/devtools/application/webmcp)
