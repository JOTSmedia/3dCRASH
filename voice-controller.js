(function () {
  "use strict";
  if (window.CRASH_VOICE) return;

  const synth = window.speechSynthesis;
  const supported = !!(synth && window.SpeechSynthesisUtterance);
  const STORAGE_KEY = "3dcrash.voice.v1";
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (_) {}
  if (!saved || typeof saved !== "object") saved = {};
  let preferredURI = typeof saved.voiceURI === "string" ? saved.voiceURI : "";
  let rate = Math.max(.8, Math.min(1.1, Number(saved.rate) || .98));
  let voices = [], generation = 0, active = null, message = supported ? "Loading device voices…" : "Speech is unavailable in this browser.";
  let loading = null, timer = 0, serial = 0;
  const mounts = [];
  const key = voice => voice.voiceURI || voice.name + "|" + voice.lang;
  const english = voice => /^en(?:[-_]|$)/i.test(voice.lang || "");

  function score(voice) {
    const name = voice.name || "";
    let value = /^en[-_]US$/i.test(voice.lang) ? 60 : 25;
    if (/natural|neural|enhanced|premium/i.test(name)) value += 100;
    if (/samantha|ava|alex\b|aria\b|jenny\b|guy\b/i.test(name)) value += 65;
    if (/google/i.test(name)) value += 55;
    if (/online/i.test(name)) value += 35;
    if (/fred|espeak|flite|robot|whisper|trinoids|zarvox|bells|bubbles|bad news|good news|cellos|hysterical|organ/i.test(name)) value -= 150;
    return value;
  }
  function available() { return voices.filter(english).sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name)); }
  function selected() {
    const list = available();
    return list.find(voice => key(voice) === preferredURI) || list[0] || null;
  }
  function getState() {
    const voice = selected();
    return { supported, voiceCount: available().length, voiceURI: voice ? key(voice) : null, voiceName: voice ? voice.name : null, rate, speaking: !!active && active.started, message, deviceVoice: true };
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ voiceURI: preferredURI, rate })); } catch (_) {}
  }
  function announce(text) {
    message = text;
    updateMounts();
    window.dispatchEvent(new CustomEvent("crashvoicestatus", { detail: getState() }));
  }
  function refresh() {
    if (!supported) return [];
    try { voices = Array.from(synth.getVoices() || []); } catch (_) { voices = []; }
    if (!active) {
      const voice = selected();
      message = voice ? "Device voice: " + voice.name : "No English voice is available. Narration is off; the text remains visible.";
    }
    updateMounts();
    return available();
  }
  function ready() {
    if (!supported) return Promise.resolve([]);
    if (refresh().length) return Promise.resolve(available());
    if (loading) return loading;
    loading = new Promise(resolve => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        synth.removeEventListener?.("voiceschanged", changed);
        loading = null;
        refresh();
        resolve(available());
      };
      const changed = () => { if (refresh().length) finish(); };
      const timeout = setTimeout(finish, 1800);
      synth.addEventListener?.("voiceschanged", changed);
    });
    return loading;
  }
  function clearActive() {
    clearTimeout(timer);
    timer = 0;
    const old = active;
    active = null;
    if (old) old.resolve(false);
    if (supported) { try { synth.cancel(); } catch (_) {} }
  }
  function stop() {
    generation++;
    clearActive();
    const voice = selected();
    announce(voice ? "Device voice: " + voice.name : "No English voice is available. Narration is off; the text remains visible.");
  }
  function chunksFor(text) {
    const sentences = text.match(/[^.!?]+[.!?]+(?:[”"']+)?|[^.!?]+$/g) || [text];
    const pieces = [];
    let current = "";
    for (const sentence of sentences) {
      const clean = sentence.trim();
      if (!clean) continue;
      if ((current + " " + clean).length <= 240) current = (current + " " + clean).trim();
      else {
        if (current) pieces.push(current);
        current = clean;
      }
      while (current.length > 300) {
        let split = current.lastIndexOf(" ", 240);
        if (split < 1) split = 240;
        pieces.push(current.slice(0, split));
        current = current.slice(split).trim();
      }
    }
    if (current) pieces.push(current);
    return pieces;
  }
  function speak(text, options = {}) {
    const id = ++generation;
    clearActive();
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    return new Promise(resolve => {
      active = { id, resolve, started: false };
      const fail = reason => {
        if (id !== generation) return;
        generation++;
        active = null;
        clearTimeout(timer);
        announce(reason);
        try { options.onerror?.(new Error(reason)); } finally { resolve(false); }
      };
      if (!clean) { active = null; resolve(false); return; }
      if (!supported) { fail("Speech is unavailable in this browser. Read the visible explanation."); return; }
      ready().then(() => {
        if (id !== generation) return;
        const voice = selected();
        if (!voice) { fail("No English voice is available. Narration is off; choose an installed English voice in your device settings."); return; }
        const chunks = chunksFor(clean);
        let index = 0;
        const next = () => {
          if (id !== generation) return;
          if (index >= chunks.length) {
            active = null;
            clearTimeout(timer);
            announce("Device voice: " + voice.name);
            try { options.onend?.(); } finally { resolve(true); }
            return;
          }
          const utterance = new SpeechSynthesisUtterance(chunks[index++]);
          utterance.voice = voice;
          utterance.lang = voice.lang || "en-US";
          utterance.rate = rate;
          utterance.pitch = 1;
          utterance.volume = 1;
          utterance.onstart = () => {
            if (id !== generation || !active) return;
            active.started = true;
            announce("Speaking · " + voice.name);
          };
          utterance.onend = () => {
            if (id !== generation) return;
            clearTimeout(timer);
            next();
          };
          utterance.onerror = event => {
            if (id !== generation) return;
            fail(event.error === "not-allowed" ? "Press a narration button to allow voice playback." : "This device voice could not play. Try another voice in Voice Settings.");
          };
          timer = setTimeout(() => {
            if (id !== generation) return;
            fail("The device voice did not respond. Try another voice in Voice Settings.");
            try { synth.cancel(); } catch (_) {}
          }, Math.max(12000, utterance.text.length * 130 + 6000));
          try { synth.speak(utterance); } catch (_) { fail("This device voice could not start. Try another voice in Voice Settings."); }
        };
        next();
      });
    });
  }

  function styles() {
    if (document.getElementById("cv-styles")) return;
    const style = document.createElement("style");
    style.id = "cv-styles";
    style.textContent = `.cv-launch{font:10px system-ui!important;letter-spacing:.06em;white-space:nowrap}.cv-dialog{color:#e7edf7;background:#0b1625;border:1px solid #446075;border-radius:12px;padding:22px;width:min(420px,calc(100vw - 28px));box-shadow:0 24px 80px #0009;font:14px/1.5 system-ui}.cv-dialog::backdrop{background:#030a12b8}.cv-dialog h2{font-size:21px;margin:0 0 5px}.cv-dialog p{color:#a9bbcc;font-size:12px;margin:8px 0 15px}.cv-dialog label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;margin:17px 0 6px}.cv-dialog select{box-sizing:border-box;width:100%;padding:10px;color:#e7edf7;background:#142436;border:1px solid #3f596e;border-radius:6px;font:13px system-ui}.cv-dialog input{width:100%;accent-color:#69e1cd}.cv-dialog button{font:11px system-ui;color:#e7edf7;background:#142436;border:1px solid #3f596e;border-radius:6px;padding:10px 12px;cursor:pointer}.cv-dialog button:focus-visible,.cv-dialog select:focus-visible,.cv-dialog input:focus-visible{outline:2px solid #69e1cd;outline-offset:3px}.cv-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:17px}.cv-status{min-height:32px;padding:11px;border-left:2px solid #edbd77;color:#edbd77;background:#192632;font-size:12px;margin-top:16px}.cv-caption{font-size:10px!important;margin:14px 0 0!important}.cv-dialog:not([open]){display:none}`;
    document.head.append(style);
  }
  function updateMounts() {
    const list = available(), voice = selected();
    const signature = list.map(v => key(v) + v.name).join("\n");
    for (const item of mounts) {
      if (item.signature !== signature) {
        item.select.replaceChildren();
        const automatic = document.createElement("option");
        automatic.value = "";
        automatic.textContent = list.length ? "Automatic — best available" : "No English voice available";
        item.select.append(automatic);
        for (const candidate of list) {
          const option = document.createElement("option");
          option.value = key(candidate);
          option.textContent = candidate.name + " · " + candidate.lang + (candidate.localService === false ? " · online" : "");
          item.select.append(option);
        }
        item.signature = signature;
      }
      item.select.value = list.some(v => key(v) === preferredURI) ? preferredURI : "";
      item.select.disabled = !list.length;
      item.sample.disabled = !voice;
      item.slider.value = String(rate);
      item.rateText.textContent = rate.toFixed(2) + "×";
      item.status.textContent = message;
      item.notice.hidden = !!voice;
      item.notice.textContent = voice ? "" : supported ? "No English voice available — narration is off." : "Speech is unavailable in this browser.";
    }
  }
  function mount(container) {
    const host = typeof container === "string" ? document.querySelector(container) : container;
    if (!host || host.querySelector(".cv-launch")) return;
    styles();
    const n = ++serial, button = document.createElement("button"), dialog = document.createElement("dialog"), notice = document.createElement("span");
    button.type = "button";
    button.className = "cv-launch";
    button.textContent = "VOICE SETTINGS";
    button.setAttribute("aria-haspopup", "dialog");
    notice.className = "cv-notice";
    notice.style.cssText = "font:11px/1.4 system-ui;color:#edbd77;max-width:230px";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    dialog.className = "cv-dialog";
    dialog.setAttribute("aria-labelledby", "cv-title-" + n);
    dialog.innerHTML = `<h2 id="cv-title-${n}">Narrator voice</h2><p>The best available English voice is selected automatically. Voice quality depends on this browser and device.</p><label for="cv-select-${n}">English voice</label><select id="cv-select-${n}" aria-describedby="cv-status-${n}"></select><label for="cv-rate-${n}">Speaking pace <output id="cv-rate-output-${n}"></output></label><input id="cv-rate-${n}" type="range" min="0.8" max="1.1" step="0.01"><div class="cv-actions"><button class="cv-sample" type="button">LISTEN SAMPLE</button><button class="cv-stop" type="button">STOP VOICE</button><button class="cv-close" type="button">DONE</button></div><div class="cv-status" id="cv-status-${n}" role="status" aria-live="polite"></div><p class="cv-caption">Device-generated speech, not a recorded voiceover or authentic flight audio. Online voices, if selected, are provided by your browser.</p>`;
    document.body.append(dialog);
    host.append(button, notice);
    const item = { button, dialog, notice, select: dialog.querySelector("select"), slider: dialog.querySelector("input"), rateText: dialog.querySelector("output"), sample: dialog.querySelector(".cv-sample"), status: dialog.querySelector(".cv-status"), signature: null };
    mounts.push(item);
    button.addEventListener("click", () => {
      window.CRASH_APP?.pause?.();
      ready();
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      updateMounts();
      item.select.focus();
    });
    item.select.addEventListener("change", () => { stop(); preferredURI = item.select.value; persist(); refresh(); });
    item.slider.addEventListener("input", () => { rate = Math.max(.8, Math.min(1.1, Number(item.slider.value) || .98)); persist(); updateMounts(); });
    item.sample.addEventListener("click", () => speak("This is the flight reconstruction narrator. The final descent is illustrated; exact impact details remain under investigation."));
    dialog.querySelector(".cv-stop").addEventListener("click", stop);
    const close = () => { stop(); if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open"); button.focus(); };
    dialog.querySelector(".cv-close").addEventListener("click", close);
    dialog.addEventListener("cancel", () => { stop(); });
    ready();
    updateMounts();
  }
  if (supported) synth.addEventListener?.("voiceschanged", refresh);
  window.CRASH_VOICE = { speak, stop, ready, mount, getState, get status() { return message; } };
  ready();
})();
