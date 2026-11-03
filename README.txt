3dCRASH — 30-second original web reconstruction
N722BD · Learjet 60 · November 1, 2026

DEPLOY TO GITHUB PAGES
1. Unzip.
2. Upload the CONTENTS with index.html at the publishing root.
3. Repository Settings > Pages > Deploy from a branch > main > / (root).
4. Open the Pages HTTPS address. Click PLAY 30 SECONDS.
No build step, API key, sign-in, installation or backend is required.
Internet is needed for Cesium, imagery, terrain, archived radar and optional ATC.
The complete app, route data and original generated jet are bundled.

30-SECOND CUT
00–06: Austin-to-Florida recorded route, intended destination North Eleuthera.
06–12: archived radar and explicitly labeled crew weather report.
12–22: final descent, enlarged 3D jet avatar and live altitude trace.
22–27: animated flight-path versus aircraft-attitude explanation.
27–30: final valid altitude report and the reconstruction's evidence boundary.
The playback clock hard-stops at 30 seconds. It does not wait for narration.
Manual pause or chapter inspection can extend the time you spend in the app.

CAMERAS / ANALYSIS
Cinematic auto, full route, orbit, chase and pilot view.
Pilot view uses a representative Pro Line 4 overlay, not measured accident instruments.
The model is an approximate original Learjet 60, not a certified simulator.
Analysis includes bank/lift, energy, forces, and path versus pitch.
Narration uses the browser/device voice and may vary by platform. Captions are always visible.
Archived radio is in SOURCES, on a separately labeled clip clock. It pauses the film.
Exact radio-to-track UTC alignment has not been established.

NO EMBEDDED REFERENCE FOOTAGE
No Facebook, TikTok or YouTube video player is embedded in this app.
The 3D route presentation, jet model and infographic graphics are newly generated.
Public reference videos informed visual direction, not the factual accident findings.

FLIGHT DATA
260 sampled public Flightradar24 observations plus six later position-only reports.
Recorded origin is Austin, Texas — not Houston.
Usable pressure altitude stops at 17:49:22.955 UTC, 8,750 ft.
Later positions through 17:49:31.540 UTC are only a dashed ground projection.
The film freezes at the altitude boundary; it does not invent the impact trajectory.
Pressure altitude is not true height above terrain. Low values are ground-clamped for display.
Groundspeed is not airspeed. Path orientation is illustrative: pitch, bank, angle of attack,
control inputs, exact impact, structural failure and accident cause are not established here.

HISTORICAL WEATHER
Verified IEM NEXRAD N0Q five-minute reflectivity archives for November 1, 2026.
The app selects the preceding scan using the displayed actual flight UTC time.
Every radar request specifies its historical TIME. No current-radar fallback is used.
The nominal frame time and age are shown; component radar scans can be up to 15 minutes old.
Radar shows precipitation reflectivity, not exact 3D clouds, cockpit visibility,
ice accumulation or the turbulence encountered by the jet.
The NTSB November 2 briefing relayed crew reports near 17:47 UTC:
moderate turbulence, light clear ice described as manageable, and -47 C temperature.
These are crew reports, not independently reconstructed flight conditions.
No weather causation is asserted.

KEYLESS EARTH
CesiumJS with NASA GIBS / public Esri imagery and Re:Earth terrain.
This is NOT Google Earth imagery. Actual Google photorealistic tiles require their own
authorized service configuration and are not silently substituted or scraped.
NASA Blue Marble is a static composite; only the separately timestamped radar is historical.
Provider availability and browser WebGL support may vary. A track-grid fallback is included.
Keep attribution: NASA; Esri/Vantor/Earthstar/GIS User Community; Re:Earth/Mapterhorn CC BY 4.0;
Iowa Environmental Mesonet/Iowa State University; NOAA/NWS NEXRAD; Flightradar24.

SOURCES
https://www.ntsb.gov/investigations/Pages/ERA27MA026.aspx
https://www.flightradar24.com/blog/flight-tracking-news/major-incident/learjet-60-crashes-near-west-palm-beach-florida/
https://mesonet.agron.iastate.edu/docs/nexrad_mosaic/
https://mesonet.agron.iastate.edu/ogc/
https://www.youtube.com/watch?v=9utTZTQbKz8
https://commons.wikimedia.org/wiki/File:Chilling_Audio_Captures_The_Last_Moments_of_Learjet_60_Plane_Crash.opus
https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/forces-in-a-climb/
https://terrain.reearth.land/

VALIDATION
JavaScript syntax, timeline/chapter controls, 30-second clamp, GLB structure and ZIP CRCs checked.
Controls exercised in a mocked DOM; full browser/WebGL and device rendering remain unverified.
Investigation ongoing. This is an educational reconstruction, not an official accident finding.
