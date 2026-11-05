export const NATIONAL_REGIONS = [
  "Caribe colombiano",
  "Antioquia",
  "Eje Cafetero",
  "Región Andina",
  "Pacífico",
  "Amazonía",
  "Llanos Orientales",
];

export const INTERNATIONAL_REGIONS = ["América", "Europa", "Otros destinos"];

export const CONTINENTS = ["América", "Europa", "Asia"];

export const EXPERIENCES = {
  playa: "Playa",
  aventura: "Aventura",
  cultural: "Cultural",
  naturaleza: "Naturaleza",
  ciudad: "Ciudad",
  romantico: "Romántico",
  familiar: "Familiar",
  gastronomia: "Gastronomía",
};

export const PLAN_CATEGORIES = [
  { key: "todos", label: "Todos" },
  { key: "nacional", label: "Nacionales" },
  { key: "internacional", label: "Internacionales" },
  { key: "familiar", label: "Familiares" },
  { key: "romantico", label: "Románticos" },
  { key: "aventura", label: "Aventura" },
  { key: "playa", label: "Playa" },
  { key: "cultural", label: "Culturales" },
  { key: "grupal", label: "Grupales" },
];

export const DURATIONS = [
  { key: "", label: "Cualquier duración" },
  { key: "1-3", label: "1 a 3 días", min: 1, max: 3 },
  { key: "4-6", label: "4 a 6 días", min: 4, max: 6 },
  { key: "7+", label: "7 días o más", min: 7, max: 999 },
];

export const BUDGETS = [
  { key: "", label: "Sin definir" },
  { key: "0-1500000", label: "Hasta $1.500.000", min: 0, max: 1500000 },
  { key: "1500000-3000000", label: "$1.500.000 – $3.000.000", min: 1500000, max: 3000000 },
  { key: "3000000-6000000", label: "$3.000.000 – $6.000.000", min: 3000000, max: 6000000 },
  { key: "6000000-", label: "Más de $6.000.000", min: 6000000, max: Infinity },
];

export const SORTS = [
  { key: "destacados", label: "Destacados primero" },
  { key: "az", label: "Nombre (A–Z)" },
  { key: "za", label: "Nombre (Z–A)" },
  { key: "precio", label: "Precio orientativo" },
];

export const PAGE_SIZE = 9;
