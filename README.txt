3dCRASH — GitHub Pages package

1. Unzip.
2. Upload the CONTENTS to your GitHub repository (index.html at its publishing root).
3. GitHub Settings > Pages > Deploy from a branch > main > / (root).
4. Open the Pages address. Click PLAY to enable narration.
No build command, API key, account integration, or backend is required.
Globe libraries, terrain, imagery, radio and the Facebook embed need internet.
Opening index.html directly may work, but HTTPS hosting is the supported target.

Controls: FULL ROUTE, ORBIT JET, CHASE, PILOT VIEW; chapter jumps; scrub timeline;
playback speed; final-minute slow playback; optional device narration.
Analysis: bank/lift, energy, four forces and flight path versus aircraft attitude.
Reference video: officially supplied Facebook embed, credited to Flight RouteXplorer.
The Facebook pixels have not been downloaded or re-rendered.

Recorded route: Austin, Texas to Florida, intended North Eleuthera, Bahamas.
260 sampled observations from public Flightradar24 standard and granular CSV files.
Pressure altitude is not true height above terrain. No invented bank, control input,
aircraft airspeed, exact impact or cause. Approximate original Learjet 60 model and
representative Pro Line 4 overlay — not a measured cockpit or certified simulator.
Last usable altitude: 17:49:22.955 UTC. Later positions are a ground projection only.
Radio has a separate clock: exact UTC alignment is not verified.
Narration uses device text-to-speech, not cloned pilot voices.

No Google Earth imagery. Keyless CesiumJS / NASA GIBS / Re:Earth.
Optional public Esri satellite service; preserve provider attribution.
NASA Blue Marble is a static composite, not current weather or airport imagery.
Terrain: Re:Earth / Mapterhorn CC BY 4.0; EGM2008/NGA.
Globe, terrain, imagery and embedded media availability depend on their providers.

Sources:
https://www.ntsb.gov/investigations/Pages/ERA27MA026.aspx
https://www.flightradar24.com/blog/flight-tracking-news/major-incident/learjet-60-crashes-near-west-palm-beach-florida/
https://www.facebook.com/61562915002233/videos/1283126707311984/
https://commons.wikimedia.org/wiki/File:Chilling_Audio_Captures_The_Last_Moments_of_Learjet_60_Plane_Crash.opus
https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/forces-in-a-climb/
https://terrain.reearth.land/

Validation: JavaScript syntax, generated GLB and bundled data checks performed.
Fallback controls exercised with a mocked DOM. Full browser/WebGL/device validation
has not been completed. Investigation remains ongoing; this is educational work.
