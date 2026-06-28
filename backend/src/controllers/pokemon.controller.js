const pool = require("../config/db");

async function getAllPokemons(req, res) {
  try {
    const { nombre, tipo, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (!Number.isInteger(pageNumber) || !Number.isInteger(limitNumber)) {
    return res.status(400).json({
      message: "page y limit deben ser números enteros",
    });
    }

    if (pageNumber < 1 || limitNumber < 1) {
    return res.status(400).json({
      message: "page y limit deben ser mayores que 0",
    });
    }

    if (limitNumber > 150) {
    return res.status(400).json({
      message: "limit no puede ser mayor que 150",
    });
    }
    const offset = (pageNumber - 1) * limitNumber;

    let baseQuery = "FROM pokemons";
    const conditions = [];
    const values = [];

    if (nombre) {
      values.push(`%${nombre}%`);
      conditions.push(`nombre ILIKE $${values.length}`);
    }

    if (tipo) {
      values.push(tipo);
      conditions.push(
        `(tipo_1 ILIKE $${values.length} OR tipo_2 ILIKE $${values.length})`
      );
    }

    if (conditions.length > 0) {
      baseQuery += " WHERE " + conditions.join(" AND ");
    }

    const dataQuery = `
      SELECT *
      ${baseQuery}
      ORDER BY pokedex_num ASC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2};
    `;

    const countQuery = `
      SELECT COUNT(*) AS total
      ${baseQuery};
    `;

    const dataValues = [...values, limitNumber, offset];

    const dataResult = await pool.query(dataQuery, dataValues);
    const countResult = await pool.query(countQuery, values);

    const total = Number(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limitNumber);

    return res.json({
      data: dataResult.rows,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener los Pokémon",
    });
  }
}
async function createPokemon(req, res) {
  try {
    const {
      pokedex_num,
      nombre,
      tipo_1,
      tipo_2,
      altura_m,
      peso_kg,
      descripcion,
      sprite_url,
      hp,
      ataque,
      defensa,
      velocidad,
    } = req.body;

    if (
      !Number.isInteger(pokedex_num) ||
      pokedex_num < 1 ||
      pokedex_num > 150 ||
      !nombre?.trim() ||
      !tipo_1?.trim()
      ) {
      return res.status(400).json({
        message:
          "pokedex_num debe ser un entero entre 1 y 150, y nombre y tipo_1 son obligatorios",
      });
      }

    const query = `
      INSERT INTO pokemons (
        pokedex_num, nombre, tipo_1, tipo_2,
        altura_m, peso_kg, descripcion, sprite_url,
        hp, ataque, defensa, velocidad
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;

    const values = [
      pokedex_num,
      nombre,
      tipo_1,
      tipo_2,
      altura_m,
      peso_kg,
      descripcion,
      sprite_url,
      hp,
      ataque,
      defensa,
      velocidad,
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Pokémon creado correctamente",
      pokemon: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe un Pokémon con ese número de Pokédex",
      });
    }

    if (error.code === "23514") {
      return res.status(400).json({
        message: "El número de Pokédex debe estar entre 1 y 150",
      });
    }

    return res.status(500).json({
      message: "Error al crear el Pokémon",
    });
  }
}

async function getPokemonById(req, res) {
  try {
    const { id } = req.params;
    const idNumber = req.idNumber;
    const result = await pool.query(
      "SELECT * FROM pokemons WHERE id = $1",
      [idNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pokémon no encontrado",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener el Pokémon",
    });
  }
}
async function deletePokemon(req, res) {
  try {
    const { id } = req.params;
    const idNumber = req.idNumber;
    const result = await pool.query(
      `DELETE FROM pokemons
       WHERE id = $1
       RETURNING *;`,
      [idNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pokémon no encontrado",
      });
    }

    return res.status(200).json({
      message: "Pokémon eliminado correctamente",
      pokemon: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al eliminar el Pokémon",
    });
  }
}
async function updatePokemon(req, res) {
  try {
    const { id } = req.params;
    const idNumber = req.idNumber;
    const {
      nombre,
      tipo_1,
      tipo_2,
      altura_m,
      peso_kg,
      descripcion,
      sprite_url,
      hp,
      ataque,
      defensa,
      velocidad,
    } = req.body;

    if (!nombre || !tipo_1) {
      return res.status(400).json({
        message: "nombre y tipo_1 son obligatorios",
      });
    }

    const query = `
      UPDATE pokemons
      SET
        nombre = $1,
        tipo_1 = $2,
        tipo_2 = $3,
        altura_m = $4,
        peso_kg = $5,
        descripcion = $6,
        sprite_url = $7,
        hp = $8,
        ataque = $9,
        defensa = $10,
        velocidad = $11
      WHERE id = $12
      RETURNING *;
    `;

    const values = [
      nombre,
      tipo_1,
      tipo_2,
      altura_m,
      peso_kg,
      descripcion,
      sprite_url,
      hp,
      ataque,
      defensa,
      velocidad,
      idNumber,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pokémon no encontrado",
      });
    }

    return res.json({
      message: "Pokémon actualizado correctamente",
      pokemon: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al actualizar el Pokémon",
    });
  }
}
module.exports = {
  getAllPokemons,
  createPokemon,
  getPokemonById,
  updatePokemon,
  deletePokemon,
};