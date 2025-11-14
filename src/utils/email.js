import emailjs from "emailjs-com";
import { guardarEnCola } from "./reintentos";

// =======================================================
//  Paciente → Psicólogo
// =======================================================
export const enviarCorreoCita = async (data, userEmail) => {

  if (!navigator.onLine) {
    guardarEnCola({ tipo: "correo_cita", payload: data }, userEmail);
    throw new Error("SIN_INTERNET");
  }

  try {
    await emailjs.send(
      "service_7hc42wa",
      "template_diaz9w7",
      {
        email: data.psicologoEmail,
        paciente: data.paciente,
        fecha: data.fecha,
        hora: data.hora,
        motivo: data.motivo,
      },
      "5wWaPG9fIKmZ2V313"
    );

  } catch (error) {
    guardarEnCola({ tipo: "correo_cita", payload: data }, userEmail);
    throw error;
  }
};


// =======================================================
//  Psicólogo → Paciente
// =======================================================
export const enviarCorreoEstadoPaciente = async (data, userEmail) => {

  if (!navigator.onLine) {
    guardarEnCola({ tipo: "correo_estado", payload: data }, userEmail);
    throw new Error("SIN_INTERNET");
  }

  try {
    await emailjs.send(
      "service_7hc42wa",
      "template_e126lvo",
      {
        email: data.pacienteEmail,
        paciente: data.paciente,
        psicologo: data.psicologo,
        fecha: data.fecha,
        hora: data.hora,
        motivo: data.motivo,
        estado: data.estado
      },
      "5wWaPG9fIKmZ2V313"
    );

  } catch (error) {
    guardarEnCola({ tipo: "correo_estado", payload: data }, userEmail);
    throw error;
  }
};
