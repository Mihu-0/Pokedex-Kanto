function FilterType({ type, setType }) {
  return (
    <select
      className="form-select"
      value={type}
      onChange={(e) => setType(e.target.value)}
      aria-label="Filtrar por tipo"
    >
      <option value="">Todos los tipos</option>
      <option value="planta">Planta</option>
      <option value="fuego">Fuego</option>
      <option value="agua">Agua</option>
      <option value="veneno">Veneno</option>
      <option value="normal">Normal</option>
      <option value="eléctrico">Electrico</option>
      <option value="bicho">Bicho</option>
      <option value="volador">Volador</option>
      <option value="tierra">Tierra</option>
      <option value="roca">Roca</option>
      <option value="psíquico">Psiquico</option>
      <option value="hielo">Hielo</option>
      <option value="lucha">Lucha</option>
      <option value="fantasma">Fantasma</option>
      <option value="dragón">Dragon</option>
    </select>
  );
}

export default FilterType;
