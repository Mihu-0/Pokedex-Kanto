const pool = require("../config/db");

async function seedPokemons() {
  try {
    for (let id = 1; id <= 150; id++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      await pool.query(
        `INSERT INTO pokemons (
          pokedex_num, nombre, tipo_1, tipo_2,
          altura_m, peso_kg, sprite_url,
          hp, ataque, defensa, velocidad
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        ON CONFLICT (pokedex_num) DO NOTHING`,
        [
          data.id,
          data.name,
          data.types[0]?.type.name,
          data.types[1]?.type.name || null,
          data.height / 10,
          data.weight / 10,
          data.sprites.front_default,
          data.stats[0].base_stat,
          data.stats[1].base_stat,
          data.stats[2].base_stat,
          data.stats[5].base_stat,
        ]
      );

      console.log(`Insertado: ${data.name}`);
    }

    console.log("Seed completado");
  } catch (error) {
    console.error("Error en seed:", error);
  } finally {
    await pool.end();
  }
}

seedPokemons();