import { NavLink } from "react-router";
import { Link } from "./Link.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function Header() {
  return (
    <header>
      <Link href="/" style={{ textDecoration: "none" }}>
        <h1 style={{ color: "#fff" }}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </Link>

      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link-active" : "")}
          to="/search"
        >
          Empleos
        </NavLink>
      </nav>

      <HeaderUserButton />
    </header>
  );
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return isLoggedIn ? (
    <button onClick={logout}>Cerrar sesión</button>
  ) : (
    <button onClick={login}>Iniciar sesión</button>
  );
};
