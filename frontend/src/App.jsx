import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import CreatePokemon from "./pages/CreatePokemon";
import EditPokemon from "./pages/EditPokemon";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/pokemon/:id/editar" element={<EditPokemon />} />
        <Route path="/crear" element={<CreatePokemon />} />
      </Routes>
    </>
  );
}

export default App;
