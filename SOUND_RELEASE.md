# Answer sounds — Cell Lab 1.0.2

Released September 21, 2026.

Correct practice answers play a brief rising three-note chime. Wrong answers play a softer descending two-note cue. Find the part uses the same feedback. Test yourself never reveals correctness through sound; it plays a neutral completion chime only after the final response. Reloading a page or revisiting results does not replay sounds.

Sound is on by default at 60% app volume. A speaker switch is available in the header; Help contains a volume slider and previews. Muting immediately stops active or pending cues. These settings persist separately from study progress. Listen/read-aloud buttons remain separate. No sound plays on page load.

The sounds are synthesized locally with Web Audio; no audio files, network fetches, microphone access, or external service are needed. The new module is included in the offline cache. Initialization/resume occurs only during the student's interaction. Missing or interrupted audio does not block grading.

## Validation

38 Node tests passed: the existing 28 grading/progress tests and 10 dedicated audio tests. Twenty-one targeted browser assertions passed. Chromium tests measured nonzero output in a real running audio graph and rendered all three cues through OfflineAudioContext, confirming distinct waveforms, bounded signal levels, and silence after each cue. All four question styles, muted grading, persistent volume/mute, preview buttons, silent test-mode responses, result reloads, and challenge feedback were exercised. Header/settings fit 320, 390, 844, and 1440-pixel widths; the new settings passed the automated accessibility scan.

A normal reload of the old 1.0.1 installation detected the 1.0.2 update. The update retained a saved draft, cached audio.js, and did not autoplay. After the local origin server was stopped, both cues produced real audio output from the cached app; mute survived an offline reload.

The Windows Playwright WebKit binary used here exposes no AudioContext, webkitAudioContext, or OfflineAudioContext. Its safe-unavailable path, grading, persistent mute, and layouts were checked instead. Actual iPhone speaker/voice output has not been physically tested; a browser audio-graph test is not a listening test on the student's device.

Implementation references: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices and https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/state .
