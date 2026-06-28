import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function PokemonForm({ pokemon }) {
  const [form, setForm] = useState({
    pokedex_num: pokemon?.pokedex_num || "",
    nombre: pokemon?.nombre || "",
    tipo_1: pokemon?.tipo_1 || "",
    tipo_2: pokemon?.tipo_2 || "",
    altura_m: pokemon?.altura_m || "",
    peso_kg: pokemon?.peso_kg || "",
    descripcion: pokemon?.descripcion || "",
    sprite_url: pokemon?.sprite_url || "",
    hp: pokemon?.hp || "",
    ataque: pokemon?.ataque || "",
    defensa: pokemon?.defensa || "",
    velocidad: pokemon?.velocidad || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        nombre: form.nombre,
        tipo_1: form.tipo_1,
        tipo_2: form.tipo_2 || null,
        altura_m: form.altura_m ? Number(form.altura_m) : null,
        peso_kg: form.peso_kg ? Number(form.peso_kg) : null,
        descripcion: form.descripcion,
        sprite_url: form.sprite_url,
        hp: form.hp ? Number(form.hp) : null,
        ataque: form.ataque ? Number(form.ataque) : null,
        defensa: form.defensa ? Number(form.defensa) : null,
        velocidad: form.velocidad ? Number(form.velocidad) : null,
      };

      if (pokemon) {
        await api.put(`/pokemons/${pokemon.id}`, payload);
      } else {
        await api.post("/pokemons", {
          ...payload,
          pokedex_num: Number(form.pokedex_num),
        });
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar el Pokemon.");
      setSaving(false);
    }
  }

  return (
    <form className="form-card p-3 p-md-4" onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <section className="mb-4">
        <h2 className="form-section-title mb-3">Informacion basica</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Numero Pokedex</label>
            <input
              type="number"
              name="pokedex_num"
              className="form-control"
              value={form.pokedex_num}
              onChange={handleChange}
              disabled={!!pokemon || saving}
              required={!pokemon}
            />
          </div>

          <div className="col-md-8">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              disabled={saving}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tipo principal</label>
            <input
              type="text"
              name="tipo_1"
              className="form-control"
              value={form.tipo_1}
              onChange={handleChange}
              disabled={saving}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tipo secundario</label>
            <input
              type="text"
              name="tipo_2"
              className="form-control"
              value={form.tipo_2}
              onChange={handleChange}
              disabled={saving}
            />
          </div>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="form-section-title mb-3">Detalles visuales y fisicos</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Altura (m)</label>
            <input
              type="number"
              step="0.01"
              name="altura_m"
              className="form-control"
              value={form.altura_m}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              step="0.01"
              name="peso_kg"
              className="form-control"
              value={form.peso_kg}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Sprite URL</label>
            <input
              type="url"
              name="sprite_url"
              className="form-control"
              value={form.sprite_url}
              onChange={handleChange}
              disabled={saving}
              placeholder="https://..."
            />
          </div>

          <div className="col-12">
            <label className="form-label">Descripcion</label>
            <textarea
              name="descripcion"
              className="form-control"
              rows="4"
              value={form.descripcion}
              onChange={handleChange}
              disabled={saving}
            />
          </div>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="form-section-title mb-3">Estadisticas</h2>
        <div className="row g-3">
          <div className="col-sm-6 col-lg-3">
            <label className="form-label">HP</label>
            <input
              type="number"
              name="hp"
              className="form-control"
              value={form.hp}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="col-sm-6 col-lg-3">
            <label className="form-label">Ataque</label>
            <input
              type="number"
              name="ataque"
              className="form-control"
              value={form.ataque}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="col-sm-6 col-lg-3">
            <label className="form-label">Defensa</label>
            <input
              type="number"
              name="defensa"
              className="form-control"
              value={form.defensa}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="col-sm-6 col-lg-3">
            <label className="form-label">Velocidad</label>
            <input
              type="number"
              name="velocidad"
              className="form-control"
              value={form.velocidad}
              onChange={handleChange}
              disabled={saving}
            />
          </div>
        </div>
      </section>

      <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">
        <Link to="/" className="btn btn-outline-secondary">
          Cancelar
        </Link>
        <button type="submit" className="btn btn-danger fw-semibold" disabled={saving}>
          {saving ? "Guardando..." : "Guardar Pokemon"}
        </button>
      </div>
    </form>
  );
}

export default PokemonForm;
