import { useState, useEffect } from "react";
import PacienteHome from "./paciente/PacienteHome";
import PacienteCitas from "./paciente/PacienteCitas";
import PacientePerfil from "./paciente/PacientePerfil";

export default function DashboardPaciente() {
  const [section, setSection] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("userLogged"));

    // Si NO hay usuario → Login
    if (!u) {
      window.location.replace("/login");
      return;
    }

    // Si el rol NO es paciente → enviarlo a su panel correcto
    if (u.rol !== "paciente") {
      if (u.rol === "psicologo") {
        window.location.replace("/psicologo");
        return;
      }
    }

    // Si todo OK → cargar usuario
    setUser(u);
  }, []);

  // Mientras valida
  if (!user) return <p>Validando acceso...</p>;

  return (
    <div style={{ display: "flex" }}>

      {/* MENU */}
      <div style={{ width: 200, padding: 20, background: "#f2f2f2" }}>
        <h3>Paciente</h3>
        <p>{user?.nombre}</p>

        <button onClick={() => setSection("home")}>🏠 Home</button> <br />
        <button onClick={() => setSection("citas")}>📅 Citas</button> <br />
        <button onClick={() => setSection("perfil")}>👤 Perfil</button> <br /><br />

        <button
          onClick={() => {
            localStorage.removeItem("userLogged");
            window.location.href = "/login";
          }}
        >
          🚪 Cerrar sesión
        </button>
      </div>

      {/* CONTENIDO */}
      <div style={{ flex: 1, padding: 30 }}>
        {section === "home" && <PacienteHome user={user} />}
        {section === "citas" && <PacienteCitas user={user} />}
        {section === "perfil" && <PacientePerfil user={user} />}
      </div>
    </div>
  );
}
