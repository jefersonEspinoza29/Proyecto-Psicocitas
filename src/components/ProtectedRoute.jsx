// src/components/ProtectedRoute.jsx
import { useEffect } from "react";

export default function ProtectedRoute({ user, role, children }) {

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (user.rol !== role) {
      // Si el rol no coincide, lo enviamos a su panel correcto
      if (user.rol === "paciente") window.location.href = "/paciente";
      if (user.rol === "psicologo") window.location.href = "/psicologo";
    }
  }, [user, role]);

  // Mientras valida
  if (!user || user.rol !== role) {
    return <p>Validando acceso...</p>;
  }

  return children;
}
