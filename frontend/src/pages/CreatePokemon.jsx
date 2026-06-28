import PokemonForm from "../components/PokemonForm";

function CreatePokemon() {
  return (
    <main className="container page-shell">
      <div className="mb-4">
        <p className="hero-kicker mb-2">Nuevo registro</p>
        <h1 className="h2 fw-bold mb-1">Crear Pokemon</h1>
        <p className="text-secondary mb-0">
          Completa los datos principales para agregarlo a la Pokedex.
        </p>
      </div>

      <PokemonForm />
    </main>
  );
}

export default CreatePokemon;
