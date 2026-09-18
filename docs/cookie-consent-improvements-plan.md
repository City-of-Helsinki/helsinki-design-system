# Cookie consent improvements plan

## Context

This plan records the audit of the cookie-consent implementation for HDS-2804.
The goal is to improve initialization, validation, rendering safety, and
lifecycle cleanup while preserving the current public API.

Primary implementation:

- `packages/react/src/components/cookieConsentCore/cookieConsentCore.js`
- `packages/react/src/components/cookieConsentCore/cookieHandler.js`
- `packages/react/src/components/cookieConsentCore/monitorAndCleanBrowserStorages.js`
- `packages/react/src/components/cookieConsentCore/template.js`

The standalone `hds-js` entry point re-exports the same `CookieConsentCore`; it
does not contain a separate implementation.

## Audit findings

Already implemented, at least partially:

- Direct construction is blocked with a private symbol.
- Cookie handling and storage monitoring are separate classes.
- HTTP errors and malformed fetched JSON produce errors.
- Rendering checks the main target, spacer parent, and page-content selector.
- Settings validation checks required groups, the consent cookie, and duplicate
  group IDs.
- The test suite covers normal banner, consent, monitoring, and storage flows.

Confirmed gaps:

- `create()` accepts truthy invalid values such as numbers, booleans, and
  arrays because its type guard is incorrect.
- `options` is documented as optional but is not safely defaulted when omitted.
- Parsed settings are not structurally validated before instance creation.
- Malformed settings can produce incidental `TypeError`s.
- Network-level `fetch()` failures lack cookie-consent context.
- Raw settings values are interpolated into `innerHTML`; this is unsafe when
  settings are loaded from an untrusted or compromised URL.
- Consent-withdrawal storage cleanup is started asynchronously but not awaited
  before saving/reloading.
- Monitor intervals are not disposed, so repeated initialization can create
  multiple polling loops.
- Dynamically injected banner styles are not removed on teardown.
- Some browser APIs and asynchronous storage operations lack capability and
  rejection handling.
- React event listener lifecycle and post-mount option changes need review.
- Cookie-consent documentation describes outdated storage formats, signatures,
  and behavior.

## Recommended scope

### Phase 1: initialization and validation

1. Add a pure `validateSiteSettings(settings)` function.
2. Validate the input to `CookieConsentCore.create()` explicitly:
   - non-empty URL string, or
   - settings object
   - reject `null`, arrays, and other primitives
3. Default omitted options to `{}`.
4. Validate required settings structure and nested group/cookie fields before
   constructing `CookieConsentCore`.
5. Preserve the existing semantic checks:
   - required groups are present
   - the configured consent cookie is in a required group
   - group IDs are unique
6. Wrap network, parsing, and validation failures with stable, actionable
   messages.

### Phase 2: rendering and lifecycle safety

1. Add defensive checks around generated forms, shadow-root elements,
   `ResizeObserver`, selectors, and removed React DOM nodes.
2. Escape or safely construct all settings-derived HTML and attributes.
3. Escape or safely query highlighted group IDs.
4. Await storage cleanup before reporting completion or reloading.
5. Store and dispose monitor intervals.
6. Remove injected styles, observers, timers, and listeners during teardown.
7. Guard IndexedDB, Cache Storage, and other optional browser APIs.
8. Handle rejected asynchronous storage operations.

### Phase 3: React and documentation

1. Fix `useCookieConsentEvents` effect dependencies and callback cleanup.
2. Decide and document whether post-mount settings changes are supported.
3. Reconcile API documentation with the current cookie format, options,
   interval behavior, event payloads, and return values.
4. Add tests for all corrected edge cases.

## Tests to add

- truthy invalid `siteSettingsParam` values
- omitted options
- malformed settings objects
- missing languages, translations, groups, cookies, and required fields
- network rejection from `fetch`
- settings-derived HTML escaping
- special-character group IDs
- repeated `create()` calls and monitor disposal
- cleanup completion before reload/change completion
- unavailable IndexedDB/Cache Storage
- rejected storage operations
- React callback identity changes
- React prop changes after initialization

## Deferred architecture decision

Do not replace `CookieConsentCore` with a function-based factory as the first
step. The class currently owns substantial state and lifecycle behavior, and
the public API, global HDS reference, React hooks, events, shadow DOM, timers,
observers, and tests all depend on its behavior.

Extract stateless logic as functions first, especially validation and parsing.
After the behavior is covered by tests, a function-based internal
implementation can be evaluated incrementally while retaining
`CookieConsentCore.create()` as a compatibility façade.

## Definition of done

- Invalid configuration fails before a consent instance is initialized.
- Errors identify whether fetching, parsing, validation, or rendering failed.
- Existing valid settings and public APIs continue to work.
- Consent withdrawal cleanup completes deterministically.
- Repeated initialization does not leak intervals, styles, observers, or
  listeners.
- Settings-derived content cannot inject unintended HTML.
- Unit and relevant end-to-end tests cover the new behavior.
- Documentation matches the implementation.
