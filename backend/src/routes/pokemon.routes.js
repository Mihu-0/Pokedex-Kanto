const express = require("express");
const router = express.Router();
const validateId = require("../middleware/validateId");

const {
  getAllPokemons,
  createPokemon,
  getPokemonById,
  updatePokemon,
  deletePokemon,
} = require("../controllers/pokemon.controller");

router.get("/", getAllPokemons);
router.post("/", createPokemon);
router.get("/:id", validateId, getPokemonById);
router.put("/:id", validateId, updatePokemon);
router.delete("/:id", validateId, deletePokemon);

module.exports = router;