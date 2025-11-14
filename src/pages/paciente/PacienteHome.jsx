import { useEffect, useState } from "react";

// Utils
import {
  getCitasPorPaciente,
  contarEstados,
  ordenarCitas
} from "../../utils/citas";

export default function PacienteHome({ user }) {
  const [citas, setCitas] = useState([]);

  // Cargar citas del paciente
  useEffect(() => {
    if (!user) return;

    let mias = getCitasPorPaciente(user.nombre);
    mias = ordenarCitas(mias);

    setCitas(mias);
  }, [user]);

  if (!user) return <p>Cargando...</p>;

  // Obtener conteo de estados
  const { pendientes, aceptadas, canceladas, atendidas } = contarEstados(citas);

  return (
    <div style={{ padding: 20 }}>
      <h2>Bienvenido, {user.nombre}</h2>

      {/* RESUMEN */}
      <h3>Resumen de citas</h3>

      <div style={{
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 6,
        marginBottom: 20,
        background: "#f7f7f7"
      }}>
        <p>Pendientes: <b>{pendientes}</b></p>
        <p>Aceptadas: <b>{aceptadas}</b></p>
        <p>Canceladas: <b>{canceladas}</b></p>
        <p>Atendidas: <b>{atendidas}</b></p>
      </div>

      {/* LISTADO DE CITAS */}
      <h3>Todas mis citas</h3>

      {citas.length === 0 ? (
        <p>No tienes citas registradas.</p>
      ) : (
        citas.map((cita, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 15,
              borderRadius: 6,
              background: "#fff"
            }}
          >
            <p><b>Psicólogo:</b> {cita.psicologo}</p>
            <p><b>Fecha:</b> {cita.fecha}</p>
            <p><b>Hora:</b> {cita.hora}</p>
            <p><b>Motivo:</b> {cita.motivo}</p>

            <p>
              <b>Estado:</b>{" "}
              <span style={{
                color:
                  cita.estado === "aceptada"
                    ? "green"
                    : cita.estado === "cancelada"
                    ? "red"
                    : cita.estado === "atendida"
                    ? "blue"
                    : "orange",
                fontWeight: "bold"
              }}>
                {cita.estado.toUpperCase()}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
