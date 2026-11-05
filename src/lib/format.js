export function formatPrice(value, currency = "COP") {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Intl.NumberFormat("es-CO", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}

export function formatDuration(dias, noches) {
  if (!dias) return null;
  const d = `${dias} ${dias === 1 ? "día" : "días"}`;
  if (!noches) return d;
  return `${d} / ${noches} ${noches === 1 ? "noche" : "noches"}`;
}

export function normalize(text = "") {
  return text.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
