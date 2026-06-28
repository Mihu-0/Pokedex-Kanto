export const POKEMON_TYPES = [
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fuego" },
  { value: "water", label: "Agua" },
  { value: "electric", label: "Electrico" },
  { value: "grass", label: "Planta" },
  { value: "ice", label: "Hielo" },
  { value: "fighting", label: "Lucha" },
  { value: "poison", label: "Veneno" },
  { value: "ground", label: "Tierra" },
  { value: "flying", label: "Volador" },
  { value: "psychic", label: "Psiquico" },
  { value: "bug", label: "Bicho" },
  { value: "rock", label: "Roca" },
  { value: "ghost", label: "Fantasma" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Siniestro" },
  { value: "steel", label: "Acero" },
  { value: "fairy", label: "Hada" },
];

const SPANISH_TO_ENGLISH = {
  normal: "normal",
  fuego: "fire",
  agua: "water",
  electrico: "electric",
  planta: "grass",
  hielo: "ice",
  lucha: "fighting",
  veneno: "poison",
  tierra: "ground",
  volador: "flying",
  psiquico: "psychic",
  bicho: "bug",
  roca: "rock",
  fantasma: "ghost",
  dragon: "dragon",
  siniestro: "dark",
  acero: "steel",
  hada: "fairy",
};

const TYPE_LABELS = POKEMON_TYPES.reduce((labels, type) => {
  labels[type.value] = type.label;
  return labels;
}, {});

function normalizeType(type) {
  return type
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function getTypeValue(type) {
  const normalized = normalizeType(type);

  if (!normalized) return "";

  return TYPE_LABELS[normalized] ? normalized : SPANISH_TO_ENGLISH[normalized] || normalized;
}

export function translateType(type) {
  const typeValue = getTypeValue(type);

  return TYPE_LABELS[typeValue] || type || "";
}

export function getTypeClass(type) {
  const typeValue = getTypeValue(type);

  return typeValue ? `type-${typeValue}` : "type-default";
}
