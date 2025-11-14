import { enviarCorreoCita } from "../utils/email";

export default function TestEmail() {

  const enviarPrueba = () => {
    enviarCorreoCita({
      psicologoEmail: "jcefe.2920@gmail.com",
      paciente: "Paciente de prueba",
      fecha: "2025-01-01",
      hora: "10:00",
      motivo: "Probando envío"
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Prueba EmailJS</h2>
      <button onClick={enviarPrueba}>Enviar</button>
    </div>
  );
}
