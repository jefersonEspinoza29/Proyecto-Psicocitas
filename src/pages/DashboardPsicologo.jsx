import { useState, useEffect } from "react";
import HomePsicologo from "./psicologo/HomePsicologo";
import CitasPsicologo from "./psicologo/CitasPsicologo";
import HorariosPsicologo from "./psicologo/HorariosPsicologo";
import PerfilPsicologo from "./psicologo/PerfilPsicologo";

export default function DashboardPsicologo() {
  const [section, setSection] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("userLogged"));

    // ❌ No hay usuario → Login
    if (!u) {
      window.location.replace("/login");
      return;
    }

    // ❌ El usuario no es psicólogo → redirigir a su panel correcto
    if (u.rol !== "psicologo") {
      if (u.rol === "paciente") window.location.replace("/paciente");
      return;
    }

    // ✔ Todo OK → cargar usuario
    setUser(u);
  }, []);

  // Mientras valida acceso
  if (!user) return <p>Validando acceso...</p>;

  return (
    <div style={{ display: "flex" }}>
      
      {/* MENU */}
      <div style={{ width: 200, padding: 20, background: "#f2f2f2" }}>
        <h3>Psicólogo</h3>
        <p>{user?.nombre}</p>

        <button onClick={() => setSection("home")}>🏠 Home</button> <br/>
        <button onClick={() => setSection("citas")}>📅 Citas</button> <br/>
        <button onClick={() => setSection("horarios")}>🕒 Horarios</button> <br/>
        <button onClick={() => setSection("perfil")}>👤 Perfil</button> <br/><br/>

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
        {section === "home" && <HomePsicologo user={user} />}
        {section === "citas" && <CitasPsicologo user={user} />}
        {section === "horarios" && <HorariosPsicologo user={user} />}
        {section === "perfil" && <PerfilPsicologo user={user} />}
      </div>

    </div>
  );
}
