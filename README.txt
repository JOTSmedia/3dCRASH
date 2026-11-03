3dCRASH — CONTINUOUS FLIGHT, IMPACT & AFTERMATH EDITION
Evidence reviewed: November 3, 2026

This package preserves the earlier 3dCRASH website and continues the main
30-second replay through an explicitly illustrative terminal descent,
impact and aerial aftermath view. The separate Impact & Aftermath lab
remains available for explanation and inspection. The rejected video is
not restored. Official sources identify the departure as Austin, not Houston.

DEPLOYMENT
Extract the ZIP. Upload its contents, including every file listed below,
to your GitHub Pages publishing directory:
- index.html
- terminal-flight.js
- voice-controller.js
- impact-lab.js
- impact-lab.css
- assets/crash-area-satellite.jpg (keep the assets/ directory)
- README.txt
- SOURCES.txt

Keep these files together. No build, account login, or API key is required
by this application. It is a static website, not an installer.

Use an HTTP(S) website or a local web server for reliable playback. Opening
index.html directly as a file can restrict external data in some browsers.

WHAT IS INCLUDED
- A 30-second flight-to-aftermath replay, camera controls, pilot overlay,
  analysis, source information, and optional device speech narration.
- At 20–27 seconds, a 3D-projected illustrative terminal section that
  follows the jet into contact at approximately 26.5 seconds of film time.
- At 27–30 seconds, an aerial aftermath-context view; inspection is
  available at the end, with rotation and zoom controls.
- A separate impact-mechanics lab, with play, pause and scrub controls.
- An aftermath/evidence view using a bundled satellite basemap.
- An audit of the uploaded reference clips and their evidentiary limits.
- Links to FAA, NTSB, flight-track, ATC-excerpt, witness-video,
  investigation-method and official records-request sources.
- Voice Settings: automatic English-voice selection, a voice selector,
  a speaking-pace control, a sample, and explicit availability warnings.

READ THE EVIDENCE LABELS
The measured-altitude portion reaches the last changing barometric altitude
used from the FR24 data: 8,750 feet at approximately 17:49:22 UTC. This is
NOT the end of all public data: subsequent horizontal position samples
exist. Those positions do not supply a measured terminal altitude history,
aircraft attitude or complete impact dynamics.

The replay then switches to a visibly labelled illustrative terminal
section. Its horizontal context uses the later position samples and the
preliminary accident location; its descent profile, aircraft pose, impact
timing, breakup and aftermath effects are modelled illustrations, not
recorded measurements. The film's 20-, 26.5- and 30-second points are edit
timings, not accident-clock times. They do not establish impact speed.

The original 3D globe uses Cesium with NASA/Esri imagery and public terrain,
not the Google Earth application or Google's photorealistic 3D tiles.
External services need internet access and may change or become unavailable.
The globe needs WebGL; a bundled track view is used if it cannot initialize.
The terminal-flight and impact-mechanics canvases and bundled aftermath map
do not need WebGL. The satellite base is projected for geographic context,
not converted into a surveyed three-dimensional accident site.

Narration uses the browser/device's available English voices. The helper
prefers available natural/enhanced voices, avoids low-quality novelty voices
when better choices exist, and uses calmer pacing. Voice quality is still
device-dependent; no particular neural voice is guaranteed. It is synthetic
explanation, not authentic pilot, ATC or emergency-call speech. Recorded
natural-voice generation was blocked by the connected provider's credit
limit; no narration MP3 was generated or bundled. The app itself makes no
voice-generation API calls. Browser-provided online voices may require
internet access. No English voice means narration stays off with a warning.

The Learjet model, cockpit, orientation, impact animation, fragments, dust,
fire and ground depression are simplified illustrations, not recovered
geometry, recorded aircraft attitude, certified flight simulation, or
measured impact physics. No crater depth, exact impact speed, impact energy,
engine power, or explosive yield is asserted by the new impact module.
The weather overlays supply archived context, not a full reconstruction of
the exact air mass or cloud geometry around the aircraft. The terminal
scene's haze and lighting are rendering treatments, not measured weather.

The satellite image is a basemap composite, not flight-date imagery and
not a photograph or surveyed model of the crater. Its marker locates the
preliminary NTSB accident coordinates; the marker is not a crater outline.

CONCLUSION AND LIMITS
The documented flight track, distress communications and FAA/NTSB aircraft
identification support a Learjet accident. Crater appearance alone does not
establish a missile or drone. No affirmative missile/drone evidence was
located in the official sources reviewed. This is not a claim of completed
forensic exclusion: the investigation is ongoing and its docket was not
released when checked. Cause and final impact dynamics remain unresolved.

The uploaded bomb-versus-plane crater image is a generic illustration.
The reference clip's "14 TONNES OF TNT" and rendered crater are not measured
accident results. No social-media footage is embedded or republished here.
The linked 1:56 ATC file is a third-party excerpt, not a certified complete
FAA release. A complete public 911-call release has not been verified;
official PBSO and PBCFR records/contact links are provided in SOURCES.txt.
No emergency calls or witness dialogue have been invented for narration.

Original map, terrain, track, radar and imagery credits remain visible in
the app. Additional sources and qualifications are in SOURCES.txt.

VERIFICATION AND ENVIRONMENT LIMITS
The existing impact lab was checked in a browser: approach-to-aftermath
playback, pause/scrub controls, all three evidence tabs, the local satellite
image, Escape/return navigation and the original analysis view. JavaScript
syntax and bundled relative-file references were checked. Voice-controller
tests cover voice ranking, pacing, completion, cancellation, delayed voice
loading, stored-preference failures and missing-English-voice errors.
The test browser could load Cesium but could not initialize WebGL, so the
original globe's GPU rendering was not verified in this environment.
The test browser exposed no English synthesis voices; audible narration
quality could not be listened to there. Voice quality must be judged on the
target device, using LISTEN SAMPLE. Do not read these checks as a claim
of certified aerodynamic or forensic validation.
