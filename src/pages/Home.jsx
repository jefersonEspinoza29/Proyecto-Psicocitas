import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>PsicoCitas</h1>
      <p>Bienvenido(a), selecciona una opción:</p>

      <Link to="/login">
        <button>Ingresar</button>
      </Link>

      <Link to="/register" style={{ marginLeft: 10 }}>
        <button>Registrarme</button>
      </Link>
    </div>
  );
}
