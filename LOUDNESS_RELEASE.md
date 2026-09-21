# Clearer answer sounds — Cell Lab 1.0.3

Released September 21, 2026, following feedback that the 1.0.2 sounds were difficult to hear.

## Changes

Both answer cues have a substantially stronger synthesized signal and a sustained body rather than an immediate exponential fade. They use triangle waveforms. The correct sound rises through three notes over about 0.82 seconds; the incorrect sound descends through two notes over about 0.71 seconds. The wrong-answer cue now uses 659/523 Hz instead of the previous 392/294 Hz. The completion cue is also stronger.

The existing mute and volume preferences are preserved, including deliberately muted or zero-volume settings. No automatic sound plays when a page loads. Test-mode correctness stays silent until the results. No study answers, scores, or drafts are changed by this release.

## Verification

38 Node unit tests and 21 targeted browser checks passed. All four quiz styles, previews, persistent mute, volume, interruption recovery, silent test-mode answers, challenge feedback, responsive layouts, and the new control accessibility were rechecked.

Real Chromium OfflineAudioContext renders compared 1.0.2 with 1.0.3 at identical 0%, 30%, 60%, and 100% app volume over one-second windows. RMS signal increased approximately 18.6 dB for correct answers, 21.9 dB for incorrect answers, and 19.1 dB for completion. These are DIGITAL SIGNAL measurements, not ear-level loudness or device sound-pressure measurements. At 100% app volume, the largest rendered sample magnitude was 0.668, below the 1.0 clipping limit; zero volume remained silent and every cue ended in silence.

A normal reload of a cached 1.0.2 installation detected the update to 1.0.3. The saved draft and an existing 30% volume preference survived. After physically stopping the local test origin, both cues still produced output from the cached app, and mute survived an offline reload.

The Windows WebKit test binary does not expose Web Audio APIs; its safe-unavailable path and layouts were checked. No claim is made that the student's physical iPhone speakers have been heard or measured. Device volume and playback routing still affect what the student hears.

Implementation references: https://developer.mozilla.org/en-US/docs/Web/API/GainNode and https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type . The app retains user volume and mute control following https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices .

Raw comparison and regression evidence: E:\BiologyCellLab\tools\loudness-audit. Open the app online and use Update app when offered; the footer should show v1.0.3.
