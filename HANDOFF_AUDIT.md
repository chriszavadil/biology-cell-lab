# Cell Lab handoff audit — version 1.0.1

Audit date: September 21, 2026. This is a study app, not a teacher-approved answer key.

## Content review

The seven prompts were compared with the supplied worksheet. All 122 questions, answer choices, explanations, 47 flashcards, and 18 cell-structure descriptions were reviewed. The six characteristics match the previously supplied classroom reading, rather than substituting another textbook's grouping. Question 108 now explicitly asks for the GENERAL uptake process (endocytosis).

Important distinctions were retained: ribosomes synthesize proteins; the nucleus supplies mRNA instructions; plants and typical underground roots need mitochondria; a plant wall resists expansion rather than excluding water; turgid describes the state and turgor pressure describes the pressure. Open-ended responses remain explicitly self-reviewed against a model and checklist.

## Reproduced defects fixed

- Standard dotted abbreviations (A.T.P., Rough E.R., R.E.R., m.R.N.A.) no longer receive false-negative grades. Contradictory answers and incomplete multi-selection still fail.
- An already-open second tab no longer saves an old snapshot over the first tab's newer work during sequential edits. Before editing, tabs synchronize this app's progress. This is not cross-device synchronization or a claim of atomic simultaneous multi-tab transactions.
- Focus survives ordering-button rerenders; mini-lab tabs support arrow keys, Home, and End. Small mobile navigation labels were enlarged and low-contrast text darkened.
- Guide confidence display updates when a checklist item is removed; imports cannot mark an incomplete checklist as ready.
- Unavailable or malformed browser storage is handled with truthful warnings and in-memory study/export support. Invalid saved rounds are rejected or normalized safely.
- Long unbroken typed answers now wrap in the results review instead of being clipped.
- The first guide's read-aloud model includes all six examples, not only the trait names.
- A reproduced upgrade defect cached OLD app assets under the NEW cache name. New service-worker installation explicitly reloads its assets from the network instead of reusing fresh-but-old HTTP cache entries.

## Automated checks completed before deployment

28 Node tests passed. They include every multiple-choice distractor, every subset of every select-all question, all 40,488 ordering permutations, typed aliases, contradictory inputs, import validation, shuffled choices, and progress calculations.

39 browser regression assertions passed across Chromium and WebKit. In EACH engine, all 122 questions were deliberately answered incorrectly and then correctly on retry. Results were exactly 0/122 then 122/122, and historical accuracy was exactly 122/244. A separate ten-question test-mode round scored exactly 5/10 while withholding correctness until the end. All seven guide drafts, all 47 flashcards, 40 topic/style combinations, backup/restore, reset cancellation, invalid imports, cell pickers, protein steps, water states, and keyboard navigation were exercised.

Axe-core 4.10.3 reported zero automated accessibility violations in 29 tested UI states. This is a scoped automated result, not a full accessibility certification. Layouts were checked at 320, 390, 844, and 1440 CSS-pixel widths. No unhandled JavaScript errors or app-originated external requests/study-data uploads were observed during these browser runs.

Four additional defensive scenarios passed across the two engines: denied storage remains usable and exportable; corrupted progress and invalid sessions recover without crashing. Further targeted checks confirmed 12,000-character draft persistence, exactly-once double submission, safe display of a 150-character unbroken answer, and the six-example read-aloud payload (using synthetic speech objects, not physical speakers).

## Update and offline proof

Both engines began with a cached copy of the deployed 1.0.0 baseline. After an explicit update to 1.0.1, the guide draft and unfinished quiz response were preserved and the actual cached data version was 1.0.1. Unrelated synthetic storage/cache sentinels remained untouched. Then the local origin server was physically stopped: the cached app reloaded and graded a quiz answer with the server unreachable. This avoids relying on WebKit's unreliable offline-emulation toggle.

## Limits and handoff

These tests use isolated browser-engine contexts, not the student's actual iPhone. Physical-device sound, installed voices, and all assistive technologies have not been verified. The synthetic speech check verifies the requested words reach the speech interface, not audible voice quality. Read-aloud remains optional; every learning activity works without it.

Progress remains local to the chosen browser. An export moves it between devices; there is no automatic device sync. The seven written responses use self-review, not an automatic essay grade. No student photo, name, school, private draft, credential, or account data was added to the repository.

After deployment, open the app online and use Update app when offered. The footer identifies version 1.0.1. A fresh browser should load this version directly. The computer at home is not the hosting server.

## Reference checks

The app's reference shelf links to OpenStax Biology 2e (cell types, organelles, secretory proteins, transport, macromolecules) and the NHGRI glossary. Additional implementation references: MDN Request.cache (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache), MDN storage event (https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event), and W3C tab interaction guidance (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Browser audit scripts and raw synthetic-test evidence are retained in E:\BiologyCellLab\tools\handoff-audit. The public unit regressions are in tests/core.test.mjs. No real user browser profile was used by the audit suites.
