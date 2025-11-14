import { useState, useEffect } from "react";
import { getUserLogged } from "../../utils/usuarios";
import { getHorarios, saveHorarios } from "../../utils/horarios";

export default function HorariosPsicologo() {
  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const [user, setUser] = useState(null);
  const [horarios, setHorarios] = useState({});

  // Cargar usuario y sus horarios
  useEffect(() => {
    const u = getUserLogged();
    if (!u) return;

    setUser(u);
    const saved = getHorarios(u.email);
    setHorarios(saved);
  }, []);

  const actualizar = (dia, campo, valor) => {
    const nuevos = {
      ...horarios,
      [dia]: {
        activo: horarios[dia]?.activo || false,
        inicio: horarios[dia]?.inicio || "",
        fin: horarios[dia]?.fin || "",
        [campo]: valor,
      },
    };
    setHorarios(nuevos);
  };

  const toggleDia = (dia) => {
    const nuevos = {
      ...horarios,
      [dia]: {
        ...horarios[dia],
        activo: !horarios[dia]?.activo,
      },
    };
    setHorarios(nuevos);
  };

  const guardarHorarios = () => {
    if (!user) return;

    // VALIDACIÓN
    for (let dia of dias) {
      const info = horarios[dia];
      if (info?.activo) {
        if (!info.inicio || !info.fin) {
          alert(`Debes completar el horario de ${dia}.`);
          return;
        }
        if (info.inicio >= info.fin) {
          alert(
            `En ${dia}, la hora de inicio debe ser menor que la hora de fin.`
          );
          return;
        }
      }
    }

    saveHorarios(user.email, horarios);
    alert("Horarios guardados correctamente");
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Configuración de Horarios</h2>

      {dias.map((dia) => {
        const habilitado = horarios[dia]?.activo || false;

        return (
          <div key={dia} style={{ marginBottom: 20 }}>
            <h4>
              <input
                type="checkbox"
                checked={habilitado}
                onChange={() => toggleDia(dia)}
              />{" "}
              {dia}
            </h4>

            <label>Inicio: </label>
            <input
              type="time"
              value={horarios[dia]?.inicio || ""}
              disabled={!habilitado}
              onChange={(e) => actualizar(dia, "inicio", e.target.value)}
            />

            <label style={{ marginLeft: 10 }}>Fin: </label>
            <input
              type="time"
              value={horarios[dia]?.fin || ""}
              disabled={!habilitado}
              onChange={(e) => actualizar(dia, "fin", e.target.value)}
            />
          </div>
        );
      })}

      <button onClick={guardarHorarios} style={{ marginTop: 20 }}>
        Guardar horarios
      </button>
    </div>
  );
}
