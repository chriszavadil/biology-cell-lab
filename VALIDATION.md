# Release validation — Cell Lab 1.0.1

Reviewed September 21, 2026. See HANDOFF_AUDIT.md for the reproduced defects, fixes, test coverage, and limitations.

- 28 Node unit tests passed, including all answer-order permutations and all select-all subsets.
- 39 expanded UI checks passed across Chromium and WebKit; every question was tested with a wrong answer and a correct retry in each engine.
- Zero automated axe-core violations across 29 tested UI states after contrast fixes.
- Four additional denied/corrupt-storage checks passed, with in-memory export and recovery verified.
- Both engines retained drafts and an unfinished quiz response through a real 1.0.0-to-1.0.1 cache upgrade.
- Both engines reloaded and used the new app after the local origin server was stopped; unrelated synthetic app storage/caches were untouched.
- Maximum-length draft, repeated submit, long answer layout, and read-aloud payload checks passed. Speech payload testing used a mock voice interface.

These are browser-engine checks, not testing on a physical iPhone or a guarantee of a defect-free app. Actual device speakers/voices and complete assistive-technology behavior remain unverified. Written biology answers use a transparent self-review checklist, not automatic essay grading.
