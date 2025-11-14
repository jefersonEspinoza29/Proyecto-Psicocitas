import { useEffect, useState } from "react";

// Utils
import {
  getCitasPorPsicologo,
  contarEstados,
  ordenarCitas
} from "../../utils/citas";

export default function HomePsicologo({ user }) {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (!user) return;

    let lista = getCitasPorPsicologo(user.email);
    lista = ordenarCitas(lista);

    setCitas(lista);
  }, [user]);

  if (!user) return <p>Cargando...</p>;

  const { pendientes, aceptadas, canceladas, atendidas } = contarEstados(citas);

  const hoy = new Date().toISOString().split("T")[0];
  const citasHoy = citas.filter(c => c.fecha === hoy).length;

  const proximas = citas.filter(c => c.estado === "aceptada").slice(0, 3);

  return (
    <div style={{ padding: 20 }}>
      <h2>Bienvenido, {user.nombre}</h2>
      <p>Panel del psicólogo</p>

      {/* RESUMEN */}
      <h3>Resumen de tus citas</h3>

      <div style={{
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 6,
        background: "#f7f7f7",
        marginBottom: 20
      }}>
        <p>Pendientes: <b>{pendientes}</b></p>
        <p>Aceptadas: <b>{aceptadas}</b></p>
        <p>Canceladas: <b>{canceladas}</b></p>
        <p>Atendidas: <b>{atendidas}</b></p>
        <p>Citas para hoy: <b>{citasHoy}</b></p>
      </div>

      {/* PRÓXIMAS CITAS */}
      <h3>Próximas citas</h3>
      {proximas.length === 0 ? (
        <p>No tienes citas programadas.</p>
      ) : (
        proximas.map((cita, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 6,
              marginBottom: 10,
              background: "#fff"
            }}
          >
            <p><b>Paciente:</b> {cita.paciente}</p>
            <p><b>Fecha:</b> {cita.fecha}</p>
            <p><b>Hora:</b> {cita.hora}</p>
            <p><b>Motivo:</b> {cita.motivo}</p>
          </div>
        ))
      )}

      {/* TIPOS DE ACCIONES */}
      <h3>Acciones rápidas</h3>
      <ul>
        <li>Revisa y gestiona tus citas.</li>
        <li>Configura tus horarios de atención.</li>
        <li>Actualiza tu perfil.</li>
      </ul>
    </div>
  );
}
