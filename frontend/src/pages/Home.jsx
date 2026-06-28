import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterType from "../components/FilterType";
import PokemonList from "../components/PokemonList";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/pokemons", {
          params: {
            nombre: search,
            tipo: type,
            page,
            limit: 150,
          },
        });

        const responsePokemons = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setPokemons(responsePokemons);
        setPagination(response.data.pagination || null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "No se pudo cargar la lista de Pokemon. Revisa que la API este activa."
        );
        setPokemons([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, [search, type, page]);

  function handleSearch(value) {
    setPage(1);
    setSearch(value);
  }

  function handleType(value) {
    setPage(1);
    setType(value);
  }

  const totalPages = pagination?.totalPages || 1;
  const hasPagination = Boolean(pagination?.totalPages && pagination.totalPages > 1);

  return (
    <main className="container page-shell">
      <section className="hero-panel">
        <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-4">
          <div>
            <p className="hero-kicker mb-2">Benjamin Angel - Desafio CRUD</p>
            <h1 className="hero-title mb-3">Pokedex Kanto</h1>
            <p className="hero-copy mb-0">
              Explora, filtra y administra tu coleccion de Pokemon desde una
              interfaz mas clara y comoda.
            </p>
          </div>

          <Link className="btn btn-danger btn-lg fw-semibold" to="/crear">
            Crear Pokemon
          </Link>
        </div>

        <div className="search-panel">
          <div className="row g-3 align-items-end">
            <div className="col-lg-8">
              <label className="form-label fw-semibold">Busqueda</label>
              <SearchBar search={search} setSearch={handleSearch} />
            </div>
            <div className="col-lg-4">
              <label className="form-label fw-semibold">Tipo</label>
              <FilterType type={type} setType={handleType} />
            </div>
          </div>
        </div>
      </section>

      <section className="content-panel mt-4 p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-4">
          <div>
            <h2 className="h4 fw-bold mb-1">Pokemon registrados</h2>
            <p className="text-secondary mb-0">
              {loading ? "Cargando resultados..." : `${pokemons.length} resultados`}
            </p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}

        {!loading && !error && pokemons.length === 0 && (
          <div className="empty-state text-center p-5">
            <h3 className="h5 fw-bold">Sin resultados</h3>
            <p className="text-secondary mb-0">
              Prueba con otro nombre o limpia el filtro de tipo.
            </p>
          </div>
        )}

        {!loading && !error && pokemons.length > 0 && (
          <>
            <PokemonList pokemons={pokemons} />

            {hasPagination && (
              <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </button>

                <span className="fw-semibold">
                  Pagina {page} de {totalPages}
                </span>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  disabled={page === totalPages}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;
