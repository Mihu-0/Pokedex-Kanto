import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand app-navbar navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span className="badge rounded-pill text-bg-light text-danger">Kanto</span>
          Pokedex
        </Link>

        <Link className="btn btn-light fw-semibold shadow-sm" to="/crear">
          Nuevo Pokemon
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
