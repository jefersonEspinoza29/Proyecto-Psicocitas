import { useState } from "react";
import { updateUsuario, setUserLogged } from "../../utils/usuarios";

export default function PacientePerfil({ user }) {

  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    password: user?.password || "",
    telefono: user?.telefono || "",
    dni: user?.dni || "",
    nacimiento: user?.nacimiento || "",
    genero: user?.genero || "",
    emergencia: user?.emergencia || "",
    descripcion: user?.descripcion || "",
  });

  const guardar = () => {
    updateUsuario(user.email, form);
    setUserLogged({ ...user, ...form });

    alert("Perfil actualizado correctamente.");
    window.location.reload();
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Mi Perfil de Paciente</h2>

      {/* DATOS PERSONALES */}
      <h3>Datos personales</h3>

      <label>Nombre completo</label>
      <input
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      /><br />

      <label>Email</label>
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br />

      <label>Contraseña</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /><br />

      <label>Teléfono</label>
      <input
        value={form.telefono}
        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
      /><br />

      <label>DNI</label>
      <input
        value={form.dni}
        onChange={(e) => setForm({ ...form, dni: e.target.value })}
      /><br />

      {/* INFORMACIÓN GENERAL */}
      <h3>Información general</h3>

      <label>Fecha de nacimiento</label>
      <input
        type="date"
        value={form.nacimiento}
        onChange={(e) => setForm({ ...form, nacimiento: e.target.value })}
      /><br />

      <label>Género</label>
      <select
        value={form.genero}
        onChange={(e) => setForm({ ...form, genero: e.target.value })}
      >
        <option value="">-- Seleccionar --</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select><br />

      <label>Contacto de emergencia</label>
      <input
        value={form.emergencia}
        onChange={(e) => setForm({ ...form, emergencia: e.target.value })}
      /><br />

      <label>Descripción del paciente</label>
      <textarea
        rows="4"
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        placeholder="Describe brevemente tu motivo de consulta o algo importante..."
      ></textarea><br /><br />

      <button onClick={guardar}>Guardar cambios</button>
    </div>
  );
}
