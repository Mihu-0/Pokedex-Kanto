import { Link } from "react-router-dom";
import { getTypeClass, translateType } from "../utils/pokemonTypes";

function PokemonCard({ pokemon }) {
  const types = [pokemon.tipo_1, pokemon.tipo_2].filter(Boolean);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="text-decoration-none text-dark">
      <article className="pokemon-card">
        <div className="pokemon-sprite-frame">
          <img
            src={pokemon.sprite_url}
            className="pokemon-sprite"
            alt={pokemon.nombre}
            loading="lazy"
          />
        </div>

        <div className="p-3">
          <p className="mb-1 small fw-bold text-danger">
            #{String(pokemon.pokedex_num).padStart(3, "0")}
          </p>
          <h2 className="h5 mb-0 text-capitalize">{pokemon.nombre}</h2>

          <div className="d-flex flex-wrap gap-2 mt-3">
            {types.map((type) => (
              <span key={type} className={`type-badge ${getTypeClass(type)}`}>
                {translateType(type)}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PokemonCard;
