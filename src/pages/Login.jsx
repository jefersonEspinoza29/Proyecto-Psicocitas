import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Credenciales incorrectas");
      return;
    }

    localStorage.setItem("userLogged", JSON.stringify(user));

    if (user.rol === "paciente") window.location.href = "/paciente";
    else window.location.href = "/psicologo";
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br/>

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}
