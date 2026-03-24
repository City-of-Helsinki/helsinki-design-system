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

## Step 9: Upgrade @testing-library/react to v16 + user-event v14
- @testing-library/react 12 → 16 (required for React 19 support)
- @testing-library/user-event 12 → 14
- Remove @testing-library/react-hooks (merged into @testing-library/react v13+)
- Replace renderHook imports, fix waitForNextUpdate → waitFor

## Step 10: Upgrade babel-jest to v29
- babel-jest 26 → 29 (match Jest 29)

## Step 11: Upgrade React + ReactDOM to 19
- react + react-dom 17.0.2 → 19.x
- Update root resolutions: @types/react + @types/react-dom → 19.x
- yarn install, fix immediate type errors

## Step 12: Fix React 19 Type Changes
- React.FC no longer includes children implicitly
- useRef() requires an argument
- ReactElement type changes
- Run tsc --noEmit, fix all type errors

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

## Step 19: Cleanup & optimization (optional)
- Remove forwardRef wrappers (25 components) — ref is a regular prop in React 19
- Switch JSX transform in tsconfig
- Update documentation

---

*Last updated: 2026-03-24*
