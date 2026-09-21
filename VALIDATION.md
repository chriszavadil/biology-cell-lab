# Release validation — Cell Lab 1.0.0

Validated September 21, 2026.

## Content and grading

- 24 Node unit tests passed on the deployment computer.
- All 122 questions exercised through real quiz form controls in Chromium.
- All four question styles tested with correct and deliberately incorrect responses.
- Seven worksheet prompts, eight topic groups, and 47 flashcards checked.
- Exact classroom six-characteristic grouping retained.
- Typed aliases and shuffled answer options checked; repeated submission does not double-count.
- Written worksheet answers use transparent self-review, not automatic essay grading.

## Browser checks

- 21 in-memory Chromium interaction checks passed during development.
- 22 native HTTP/browser checks passed across Chromium and WebKit.
- Reload preserved actual localStorage progress, saved guide drafts, and sessionStorage quiz state.
- All primary routes fit 320, 390, 768, and 1440-pixel viewports without horizontal overflow.
- Cell exploration, protein steps, and water-state controls responded correctly.
- Service worker installed and controlled the app in both engines.
- Both engines reloaded the app and started a quiz after the origin test server was terminated.
- Uncached negative-control contexts failed to load the stopped origin, as expected.
- WebKit's offline-emulation internal error was reproduced; offline behavior was verified with real origin shutdown instead (Playwright issue 42775).
- No JavaScript runtime errors were observed in the successful native test runs.

These are automated browser-engine tests, not a claim of testing on a physical iPhone. Device-specific voice quality depends on the installed system voices.
