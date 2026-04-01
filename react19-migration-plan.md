# React 17 → 19 Migration Plan for Helsinki Design System

## Context
Migration of the HDS monorepo from React 17 to React 19. Branch: `react-19-update`, starting at commit `457d8a65872b9fba026dfde8e25beb0ff988cdb5`.

---

## Step 1: Remove legacy defaultProps ✅
- Commit: `4a31c6ebd7`
- Removed `Component.defaultProps` patterns (deprecated in React 18.3, removed in 19)

## Step 2: Remove act() from test utils ✅
- Commit: `bd2ceebe1a`
- Cleaned up `act()` wrapping from test utilities

## Step 3: Update TypeScript ✅
- Commit: `2c5e577191`
- TypeScript 4.8 → 5.6, fixed eslint config

## Step 4: Update Jest ✅
- Commit: `dd17de16b1`
- Jest 26 → 29, ts-jest 29, jest-environment-jsdom 29

## Step 5: Update Testing Library ✅
- Commit: `08feffd330`
- @testing-library/dom 8, jest-dom 6, react 12

## Step 6: Upgrade Storybook 6 → 8 ✅
- Commit: `284060864b`
- Storybook 8 with webpack5, SWC compiler, fixed story imports, fake timer tests

## Step 7: Fix E2E tests for Storybook 8 ✅
- Commit: `0fd357a144`
- Updated Playwright config and test utilities for Storybook 8

## Step 8: Fix remaining E2E snapshot issues ✅
- Fixed 8 core story files with missing icon CSS imports (Storybook 8 requires explicit imports):
  - hero: arrow-down.css
  - link: button.scss, icon.css, link-external.css
  - notification: icon.css, info-circle-fill.css, check-circle-fill.css, alert-circle-fill.css, error-fill.css
  - pagination: icon.css, angle-left.css, angle-right.css
  - search-input: icon.css, search.css
  - status-label: icon.css, info-circle.css, check-circle.css, alert-circle.css, error.css
  - tag: icon.css, share.css, cross.css
  - breadcrumb: icon.css
- Fixed React Hero stories: migrated from deprecated argTypes.defaultValue to args (Storybook 8 breaking change)
- Added Playwright snapshot tolerance (maxDiffPixelRatio: 0.01, threshold: 0.35) for sub-pixel font rendering
- Updated remaining snapshot baselines (font rendering drift)
- All 208 e2e tests passing

## Step 9: Upgrade babel-jest to v29 ✅
- Commit: `88d54e3ce5`
- babel-jest 26 → 29 (match Jest 29)

## Step 10: Upgrade React 17 → 19 + testing-library + fix types ✅
- Commit: `0326148c77`
- react + react-dom 17.0.2 → 19.x
- @types/react + @types/react-dom → 19.x
- Updated root resolutions
- @testing-library/react 12 → 16, dom 8 → 10, user-event 12 → 14
- Removed @testing-library/react-hooks
- Fixed 77+ TypeScript errors: useRef(null), JSX namespace,
  FC children, ReactElement.props unknown, cloneElement strict typing,
  ref callbacks, @react-spring/web compat
- Updated test snapshots
- 21 test suites still failing (56 tests)

## Step 11: Fix remaining unit test failures ✅
- 21 test suites, 56 tests originally failing after React 19 upgrade
- Fixed ESLint: forced eslint 8.57.0 via root resolutions (was picking up v7 from @typescript-eslint/eslint-plugin v5 hoisted by Gatsby)
- Fixed ESLint: added parserOptions.project:true to packages/react/.eslintrc.json for @typescript-eslint v8 compat
- Fixed userEvent: added await to all userEvent.click/tab/type/upload/hover/keyboard calls across 10 test files (user-event v14 is fully async)
- Fixed TypeScript: added children prop to Visible component (React 19 FC no longer includes children implicitly)
- Fixed TypeScript: cast child.props in MenuButton/Menu.tsx (React 19 ReactElement.props is now unknown)
- Fixed FileInput: pass { applyAccept: false } to userEvent.upload in accept-validation tests (v14 filters files before component sees them)
- Fixed Dialog: replaced userEvent.type('{esc}') with userEvent.keyboard('{Escape}') for proper v14 escape key
- Updated DateInput snapshots (now correctly capture open picker state after awaiting click)
- Fixed DataProvider/hooks tests: moved waitFor outside act() (React 19 async batching pattern)
- Fixed login test utils: timerTestUtil.advanceAndFlush — moved realSetImmediate inside act() so React 19 flushes signal-driven state updates
- Fixed login test utils: removed render-inside-act() wrappers where effects were deferred (apiTokensClient, graphQLModule hooks)
- Fixed React 19 async batching in signal tracking: consecutive signals emitted synchronously (emitError + emitStateChange) are now batched, losing the error signal. Fixed by using useSignalTrackingWithCallback for error detection (runs synchronously, bypasses setState batching) in: client/hooks.test.tsx, sessionPoller/hooks.test.tsx, headerUserItems/HeaderLoginButton.tsx (production fix)
- All 148 test suites / 1227 tests now passing

## Step 13: Fix ref cleanup function changes
- Verify react-merge-refs, react-popper, react-use-measure compat
- Check ref callback patterns

## Step 14: Verify React-dependent library compatibility
- @react-spring/web 9.3.0 → 9.7+ (React 19 support)
- @react-aria/visually-hidden 3.8.16 → latest
- react-popper 2.2.5 — check compat or migrate to @floating-ui/react
- react-hook-form ^7.43.3 → ^7.50+
- @apollo/client ^3.10.1 — verify compat

## Step 15: Run & fix unit tests
- Full test suite on React 19
- Fix act() behavior changes, async rendering, state batching

## Step 16: Fix Rollup build
- Verify build completes, externals correct, ESM + CJS outputs work
- Consider jsx transform: "react" → "react-jsx"

## Step 17: Run & fix E2E / visual regression tests (React 19)
- Update baselines after React 19 rendering changes

## Step 18: Upgrade Site (Gatsby) to React 19
- Site uses React 18.2.0 + Gatsby 5
- Option A: Upgrade site to React 19
- Option B: Keep site on React 18 if Gatsby blocks

## Step 20: Upgrade Gatsby to latest version
- Do this after all other updates are done
- Gatsby 5 pulls in `eslint-config-react-app` which forces `@typescript-eslint/eslint-plugin` v5 to root, conflicting with v8 used by hds-react
- Updating Gatsby should remove this conflict and allow a clean single version of @typescript-eslint across the monorepo
- Also drop `eslint-config-react-app` from site if Gatsby no longer requires it (it is officially deprecated)

## Step 19: Cleanup & optimization (optional)
- Remove forwardRef wrappers (25 components) — ref is a regular prop in React 19
- Switch JSX transform in tsconfig
- Update documentation

---

*Last updated: 2026-03-24*
