export const toTimeInput = (t) => {
  if (!t) return "";
  // 1) strip milliseconds/timezone if present
  const basic = t.replace(/Z|[+-]\d{2}:\d{2}$/i, "").trim();

  // matches 24h "HH:MM" or "HH:MM:SS"
  const m24 = basic.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (m24) {
    const h = String(Math.min(23, parseInt(m24[1], 10))).padStart(2, "0");
    const mm = m24[2];
    return `${h}:${mm}`;
  }

  // matches 12h "H:MM AM/PM"
  const m12 = basic.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (m12) {
    let h = parseInt(m12[1], 10) % 12;
    if (/pm/i.test(m12[3])) h += 12;
    return `${String(h).padStart(2, "0")}:${m12[2]}`;
  }

  return "";
};

export const toDateTimeLocal = (d) => {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  // yyyy-MM-ddTHH:mm
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
