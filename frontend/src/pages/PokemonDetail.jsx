import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function getTypeClass(type) {
  const normalized = type
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return normalized ? `type-${normalized}` : "type-default";
}

function StatBar({ label, value }) {
  const safeValue = Number(value) || 0;
  const percentage = Math.min((safeValue / 150) * 100, 100);

  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <div className="progress" role="progressbar" aria-valuenow={safeValue}>
        <div className="progress-bar bg-danger" style={{ width: `${percentage}%` }} />
      </div>
      <span className="fw-bold text-end">{safeValue}</span>
    </div>
  );
}

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/pokemons/${id}`);
        setPokemon(response.data.data || response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "No se pudo cargar este Pokemon. Revisa que exista o intenta nuevamente."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

  async function handleDelete() {
    const confirmDelete = window.confirm("Seguro que quieres eliminar este Pokemon?");

    if (!confirmDelete) return;

    setDeleting(true);
    setError("");

    try {
      await api.delete(`/pokemons/${id}`);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "No se pudo eliminar este Pokemon. Intenta nuevamente."
      );
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="container page-shell">
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </main>
    );
  }

  if (error && !pokemon) {
    return (
      <main className="container page-shell">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-outline-danger">
          Volver al inicio
        </Link>
      </main>
    );
  }

  const types = [pokemon.tipo_1, pokemon.tipo_2].filter(Boolean);

  return (
    <main className="container page-shell">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
        <Link to="/" className="btn btn-outline-secondary align-self-start">
          Volver
        </Link>

        <div className="d-flex gap-2">
          <Link to={`/pokemon/${id}/editar`} className="btn btn-warning fw-semibold">
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger fw-semibold"
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <section className="detail-card p-3 p-md-4">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <div className="detail-sprite-panel">
              <img
                src={pokemon.sprite_url}
                alt={pokemon.nombre}
                className="detail-sprite"
              />
            </div>
          </div>

          <div className="col-lg-7">
            <p className="hero-kicker mb-2">
              #{String(pokemon.pokedex_num).padStart(3, "0")}
            </p>
            <h1 className="display-5 fw-bold text-capitalize mb-3">{pokemon.nombre}</h1>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {types.map((type) => (
                <span key={type} className={`type-badge ${getTypeClass(type)}`}>
                  {type}
                </span>
              ))}
            </div>

            <p className="lead text-secondary">{pokemon.descripcion}</p>

            <div className="row g-3 my-4">
              <div className="col-sm-6">
                <div className="border rounded-3 p-3 bg-light">
                  <p className="small text-secondary mb-1">Altura</p>
                  <p className="h5 mb-0">{pokemon.altura_m || "-"} m</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="border rounded-3 p-3 bg-light">
                  <p className="small text-secondary mb-1">Peso</p>
                  <p className="h5 mb-0">{pokemon.peso_kg || "-"} kg</p>
                </div>
              </div>
            </div>

            <div className="d-grid gap-3">
              <StatBar label="HP" value={pokemon.hp} />
              <StatBar label="Ataque" value={pokemon.ataque} />
              <StatBar label="Defensa" value={pokemon.defensa} />
              <StatBar label="Velocidad" value={pokemon.velocidad} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PokemonDetail;
