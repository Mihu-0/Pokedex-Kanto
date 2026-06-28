import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons }) {
  return (
    <div className="row g-4">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="col-sm-6 col-lg-4 col-xl-3">
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
