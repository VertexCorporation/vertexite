/* Shared, privacy-conscious bridge from Cal.com booking to confirmed Firestore application. */
(() => {
  "use strict";
  const KEY = "vertex.pendingInterview.v1";
  const TTL = 24 * 60 * 60 * 1000;
  const URLS = [
    "https://europe-west1-vertex-ai-1618.cloudfunctions.net/createVertexContributor",
    "https://createvertexcontributor-o5h7dmtija-ew.a.run.app/"
  ];
  const messages = {
    tr: {
      missing: "Mülakat randevusu oluştu ancak rezervasyon kimliği veya tarihi alınamadı. Başvurunuz henüz kaydedilmedi. Sayfayı kapatmadan destek ekibine bildirin.",
      failure: "Mülakat randevunuz alınmış olabilir fakat başvurunuz Vertex Konsol'a kaydedilemedi. Yeniden mülakat almanıza gerek yok; Başvuruyu Gönder düğmesini tekrar deneyin.",
      conflict: "Bu mülakat randevusu farklı bir e-posta ile ilişkilendirilmiş. Lütfen Vertex ekibiyle iletişime geçin.",
      confirm: "Başvuru kaydı henüz doğrulanmadı."
    },
    en: {
      missing: "The interview was booked, but its ID or time was not received. Your application has not been saved. Please contact support without closing this page.",
      failure: "Your interview may be booked, but the application was not saved to Vertex Console. Do not book again; retry Submit Application.",
      conflict: "This booking is already associated with another email. Please contact the Vertex team.",
      confirm: "Application storage could not be confirmed."
    }
  };
  const t = () => messages[document.documentElement.lang] || messages.en;

  function extract(raw) {
    const pending = [raw], visited = new Set();
    let uid = null, startTime = null;
    for (let i = 0; i < pending.length && i < 24; i++) {
      const item = pending[i];
      if (!item || typeof item !== "object" || visited.has(item)) continue;
      visited.add(item);
      const candidateUid = item.uid ?? item.bookingUid ?? item.booking_uid ?? item.id;
      const candidateTime = item.startTime ?? item.start ?? item.bookingStartTime ?? item.date;
      if (candidateUid != null && candidateTime != null && Number.isFinite(Date.parse(candidateTime))) {
        return { uid: String(candidateUid), startTime: new Date(candidateTime).toISOString() };
      }
      if (uid == null && candidateUid != null) uid = String(candidateUid);
      if (startTime == null && candidateTime != null && Number.isFinite(Date.parse(candidateTime))) startTime = new Date(candidateTime).toISOString();
      for (const key of ["detail", "data", "booking", "payload", "event"]) {
        if (item[key] && typeof item[key] === "object") pending.push(item[key]);
      }
    }
    return { uid, startTime };
  }

  function remember(booking) {
    if (!booking?.uid || !booking?.startTime) return;
    try { sessionStorage.setItem(KEY, JSON.stringify({ booking, storedAt: Date.now() })); } catch {}
  }
  function restore() {
    try {
      const value = JSON.parse(sessionStorage.getItem(KEY));
      if (Date.now() - value.storedAt > TTL || value.storedAt > Date.now()) { forget(); return null; }
      const info = extract(value.booking);
      return info.uid && info.startTime ? info : null;
    } catch { return null; }
  }
  function forget() {
    try { sessionStorage.removeItem(KEY); } catch {}
  }

  async function submit(data) {
    let lastError;
    for (let i = 0; i < URLS.length; i++) {
      let response;
      try {
        response = await fetch(URLS[i], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: AbortSignal.timeout(20000),
          credentials: "omit"
        });
      } catch (error) {
        lastError = error;
        if (i + 1 < URLS.length) continue;
        break;
      }
      let result;
      try { result = await response.json(); } catch { result = null; }
      if (response.ok && result?.success === true && typeof result.id === "string" && result.id.length) return result;
      const status = response.status;
      lastError = Object.assign(new Error("Application storage not confirmed"), { status });
      // Retry the other official endpoint only on an unavailable alias/server.
      // Idempotency is enforced server-side by the Cal.com booking UID.
      if ([404, 502, 503, 504].includes(status) && i + 1 < URLS.length) continue;
      break;
    }
    throw lastError || new Error("Application storage not confirmed");
  }

  function report(error, statusBox) {
    const message = error?.status === 409 ? t().conflict : t().failure;
    console.error("[APPLICATION] Persistence not confirmed", { status: error?.status || null, kind: error?.name || "error" });
    if (!statusBox) { alert(message); return; }
    statusBox.className = "interview-status-box";
    statusBox.style.display = "flex";
    statusBox.replaceChildren();
    const content = document.createElement("div");
    content.className = "status-content";
    const heading = document.createElement("strong");
    heading.textContent = t().confirm;
    const detail = document.createElement("span");
    detail.textContent = message;
    content.append(heading, detail);
    statusBox.append(content);
    statusBox.setAttribute("role", "alert");
  }
  function missing(statusBox) {
    if (!statusBox) return;
    statusBox.style.display = "flex";
    statusBox.className = "interview-status-box";
    statusBox.replaceChildren();
    const text = document.createElement("span");
    text.textContent = t().missing;
    statusBox.append(text);
    statusBox.setAttribute("role", "alert");
  }
  window.VertexApplication = { extract, submit, remember, restore, forget, report, missing };
})();