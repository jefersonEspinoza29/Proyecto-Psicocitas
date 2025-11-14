import { useEffect } from "react";

export default function useAuthGuard(requiredRole) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userLogged"));

    // No logueado → login
    if (!user) {
      window.location.replace("/login");
      return;
    }

    // Rol incorrecto → redirigir a su dashboard
    if (user.rol !== requiredRole) {
      if (user.rol === "paciente") window.location.replace("/paciente");
      if (user.rol === "psicologo") window.location.replace("/psicologo");
    }
  }, [requiredRole]);
}
