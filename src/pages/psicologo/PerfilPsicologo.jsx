import { useState } from "react";

// Utils
import {
  updateUsuario,
  setUserLogged
} from "../../utils/usuarios";

export default function PerfilPsicologo({ user }) {

  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    password: user?.password || "",
    especialidad: user?.especialidad || "",
    colegiatura: user?.colegiatura || "",
    experiencia: user?.experiencia || "",
    telefono: user?.telefono || "",
    descripcion: user?.descripcion || "",
  });

  const guardar = () => {
    updateUsuario(user.email, form);
    setUserLogged({ ...user, ...form });

    alert("Perfil actualizado correctamente.");
    window.location.reload();
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Mi Perfil Profesional</h2>

      {/* DATOS PERSONALES */}
      <h3>Datos personales</h3>

      <label>Nombre</label>
      <input
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <br />

      <label>Email</label>
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />

      <label>Contraseña</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br /><br />

      {/* DATOS PROFESIONALES */}
      <h3>Datos profesionales</h3>

      <label>Especialidad</label>
      <input
        value={form.especialidad}
        onChange={(e) => setForm({ ...form, especialidad: e.target.value })}
        placeholder="Ej: Terapia cognitivo-conductual"
      />
      <br />

      <label>N° de colegiatura</label>
      <input
        value={form.colegiatura}
        onChange={(e) => setForm({ ...form, colegiatura: e.target.value })}
        placeholder="CMP / CPsP / etc."
      />
      <br />

      <label>Años de experiencia</label>
      <input
        type="number"
        value={form.experiencia}
        onChange={(e) => setForm({ ...form, experiencia: e.target.value })}
        placeholder="Ej: 5"
      />
      <br />

      <label>Teléfono</label>
      <input
        value={form.telefono}
        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        placeholder="Ej: 987654321"
      />
      <br />

      <label>Descripción profesional</label>
      <textarea
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        placeholder="Cuéntales a tus pacientes sobre ti, tu forma de trabajar, etc."
        rows="4"
      />
      <br /><br />

      <button onClick={guardar}>Guardar cambios</button>
    </div>
  );
}
