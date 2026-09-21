# Cell Lab

A static, mobile-first Honors Biology Unit 2 study app.

**Live app:** https://chriszavadil.github.io/biology-cell-lab/

## Included

- Seven exact worksheet prompts, model answers, plain-English explanations, saved drafts, self-review checklists.
- 122 original questions across eight topics, using multiple choice, typed terms, select-all, and ordered sequences.
- Immediate-feedback practice and deferred-feedback test mode, shuffled answer choices, and missed-question review.
- 47 flashcards with independent recall self-ratings.
- Original interactive animal, plant, and bacterial cell schematics, a five-step secretory protein journey, and a qualitative osmosis comparison.
- Local browser progress, JSON backup/restore, guarded reset, responsive layouts, keyboard-accessible controls, optional device read-aloud, offline PWA support.

## Run

No dependencies or build step. Serve this directory using `python -m http.server 8080` and open http://localhost:8080. ES modules require an HTTP server; do not open index.html through file://.

GitHub Pages publishes `main` from the repository root. The public app has no server, account system, API keys, or analytics. Do not add student personal information or the original worksheet photograph to this repository.

## Accuracy and privacy

Written study-guide explanations are **self-reviewed**, not automatically graded. Typed quizzes normalize case, accents, punctuation, whitespace, leading articles, and explicitly declared aliases; they do not use loose substring or fuzzy matching. Quiz accuracy includes retries and excludes flashcard confidence and diagram practice. A missed question leaves the review queue after a later correct quiz answer.

Content is study material, not a teacher-approved answer key. References are listed in the app. The six traits follow the supplied classroom reading. Diagrams are qualitative schematics, not to scale. Plant diagrams represent photosynthetic cells; typical underground roots are explicitly distinguished. No copyrighted textbook diagrams were copied.

Progress and drafts remain in localStorage on the current browser. The current quiz round uses sessionStorage. Clearing site data can erase progress. Exports contain personal drafts and should be kept private. Device speech may use an online service, depending on the selected platform voice.

## Update safely

Change the version in `data.js` and the cache version in `sw.js` when releasing. The service worker caches only this app's scope and deletes only its own old cache names; it does not touch other GitHub Pages apps. An installed update waits for the student to click Update app before activation.

## Project files

`app.js`: interface and interactions. `core.js`: pure grading, question selection, storage validation, and statistics. `data.js`: study content. `visuals.js`: original SVG cell diagrams. `styles.css`: desktop/mobile presentation. `sw.js`: offline cache. Tests and release validation notes are included separately in the repository.
