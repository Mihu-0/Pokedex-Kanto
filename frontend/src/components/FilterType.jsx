import { POKEMON_TYPES } from "../utils/pokemonTypes";

function FilterType({ type, setType }) {
  return (
    <select
      className="form-select"
      value={type}
      onChange={(e) => setType(e.target.value)}
      aria-label="Filtrar por tipo"
    >
      <option value="">Todos los tipos</option>
      {POKEMON_TYPES.map((pokemonType) => (
        <option key={pokemonType.value} value={pokemonType.value}>
          {pokemonType.label}
        </option>
      ))}
    </select>
  );
}

export default FilterType;
