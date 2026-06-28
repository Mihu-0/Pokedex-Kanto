function SearchBar({ search, setSearch }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white">Buscar</span>
      <input
        type="search"
        className="form-control"
        placeholder="Nombre del Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
