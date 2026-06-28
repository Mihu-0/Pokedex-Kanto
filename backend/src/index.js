const express = require("express");
const cors = require("cors");

const pokemonRoutes = require("./routes/pokemon.routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Pokédex funcionando");
});

app.use("/api/pokemons", pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});