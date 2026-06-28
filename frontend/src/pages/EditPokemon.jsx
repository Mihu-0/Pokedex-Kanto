import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import PokemonForm from "../components/PokemonForm";

function EditPokemon() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            "No se pudo cargar este Pokemon para editar."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

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

  if (error) {
    return (
      <main className="container page-shell">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-outline-danger">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="container page-shell">
      <div className="mb-4">
        <p className="hero-kicker mb-2">Editar registro</p>
        <h1 className="h2 fw-bold mb-1">Editar Pokemon</h1>
        <p className="text-secondary mb-0">
          Actualiza los datos de {pokemon.nombre} sin cambiar el endpoint.
        </p>
      </div>

      <PokemonForm pokemon={pokemon} />
    </main>
  );
}

export default EditPokemon;
