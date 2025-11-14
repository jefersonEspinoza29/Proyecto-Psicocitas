import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "paciente",
  });

  const handleRegister = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(form);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Registro</h2>
      
      <input
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      /><br/>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br/>

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /><br/>

      <select
        onChange={(e) => setForm({ ...form, rol: e.target.value })}
      >
        <option value="paciente">Paciente</option>
        <option value="psicologo">Psicólogo</option>
      </select><br/><br/>

      <button onClick={handleRegister}>Registrarme</button>
    </div>
  );
}
