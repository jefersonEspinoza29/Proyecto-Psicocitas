import { useState, useEffect } from "react";
import { enviarCorreoCita } from "../../utils/email";

// Utils
import { getUsuarios } from "../../utils/usuarios";
import { getHorarios, generarHoras } from "../../utils/horarios";
import { getCitas, crearCita, horaOcupada } from "../../utils/citas";
import { obtenerDiaSemana } from "../../utils/fechas";

// Reintentos
import {
    getColaCorreos,
    procesarColaCorreos
} from "../../utils/reintentos";

export default function PacienteCitas({ user }) {

    const emailUsuario = user.email;

    const [psicologos, setPsicologos] = useState([]);
    const [psicologoSeleccionado, setPsicologoSeleccionado] = useState(null);
    const [horarios, setHorarios] = useState({});

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");

    const [offline, setOffline] = useState(!navigator.onLine);
    const [pendientes, setPendientes] = useState([]);

    useEffect(() => {
        const usuarios = getUsuarios();
        setPsicologos(usuarios.filter(u => u.rol === "psicologo"));

        setPendientes(getColaCorreos(emailUsuario));

        window.addEventListener("online", async () => {
            setOffline(false);
            const resultado = await procesarColaCorreos(emailUsuario);
            setPendientes(resultado.restantes);
        });

        window.addEventListener("offline", () => setOffline(true));

    }, [emailUsuario]);

    const cargarHorarios = (email) => {
        setHorarios(getHorarios(email));
    };

    const obtenerHorasOcupadas = () => {
        if (!psicologoSeleccionado || !fecha) return [];
        return getCitas()
            .filter(c =>
                c.psicologoEmail === psicologoSeleccionado.email &&
                c.fecha === fecha &&
                (c.estado === "aceptada" || c.estado === "pendiente")
            )
            .map(c => c.hora);
    };

    const solicitarCita = async () => {

        if (!psicologoSeleccionado || !fecha || !hora || !motivo) {
            alert("Completa todos los campos.");
            return;
        }

        if (horaOcupada(psicologoSeleccionado.email, fecha, hora)) {
            alert("Esta hora ya está ocupada.");
            return;
        }

        crearCita({
            paciente: user.nombre,
            psicologo: psicologoSeleccionado.nombre,
            psicologoEmail: psicologoSeleccionado.email,
            motivo,
            fecha,
            hora,
            estado: "pendiente",
        });

        try {
            await enviarCorreoCita({
                psicologoEmail: psicologoSeleccionado.email,
                paciente: user.nombre,
                fecha,
                hora,
                motivo,
            }, emailUsuario);

            alert("✔ Correo enviado correctamente.");

        } catch (error) {

            if (error.message === "SIN_INTERNET") {
                alert("⚠ No tienes internet. El correo se guardó en COLA.");
            } else {
                alert("⚠ Error en el servidor. El correo se guardó en COLA.");
            }
        }

        setPendientes(getColaCorreos(emailUsuario));

        setMotivo("");
        setFecha("");
        setHora("");
    };

    const diaSemana = fecha ? obtenerDiaSemana(fecha) : null;
    const diaActivo = diaSemana && horarios[diaSemana]?.activo;

    return (
        <div>
            <h2>Agendar Cita</h2>

            {offline && (
                <p style={{ color: "red" }}>
                    ⚠ Estás sin conexión. El correo se enviará cuando vuelva el internet.
                </p>
            )}

            {pendientes.length > 0 && (
                <div style={{ background: "#ffeaa7", padding: 10, borderRadius: 8 }}>
                    <p>📨 Tienes <b>{pendientes.length}</b> correos pendientes.</p>

                    <button
                        onClick={async () => {
                            if (!navigator.onLine) {
                                alert("Sin conexión.");
                                return;
                            }

                            const resultado = await procesarColaCorreos(emailUsuario);
                            setPendientes(resultado.restantes);

                            if (resultado.enviados > 0) {
                                alert(`📨 ${resultado.enviados} correos reenviados.`);
                            } else {
                                alert("❗No se pudo reenviar ningún correo.");
                            }
                        }}
                    >
                        Reintentar ahora
                    </button>
                </div>
            )}

            <label>Selecciona un psicólogo:</label><br />
            <select
                value={psicologoSeleccionado?.email || ""}
                onChange={(e) => {
                    const ps = psicologos.find(p => p.email === e.target.value);
                    setPsicologoSeleccionado(ps);
                    cargarHorarios(ps.email);
                    setFecha("");
                    setHora("");
                }}
            >
                <option value="">-- Elegir --</option>
                {psicologos.map((p, i) => (
                    <option key={i} value={p.email}>{p.nombre}</option>
                ))}
            </select>

            {psicologoSeleccionado && (
                <>
                    <h3>Disponibilidad de {psicologoSeleccionado.nombre}</h3>

                    <label>Fecha:</label><br />
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => { setFecha(e.target.value); setHora(""); }}
                    /><br /><br />

                    {fecha && !diaActivo && (
                        <p style={{ color: "red" }}>El psicólogo NO atiende los días {diaSemana}</p>
                    )}

                    {fecha && diaActivo && (
                        <>
                            <p>Día: <b>{diaSemana}</b></p>
                            <p>Horario: {horarios[diaSemana].inicio} - {horarios[diaSemana].fin}</p>

                            <label>Hora:</label><br />
                            <select value={hora} onChange={(e) => setHora(e.target.value)}>
                                <option value="">-- Elegir hora --</option>

                                {generarHoras(
                                    horarios[diaSemana].inicio,
                                    horarios[diaSemana].fin
                                )
                                    .filter(h => !obtenerHorasOcupadas().includes(h))
                                    .map((h, i) => (
                                        <option key={i} value={h}>{h}</option>
                                    ))}
                            </select>
                        </>
                    )}
                </>
            )}

            <br /><br />

            <label>Motivo:</label><br />
            <input
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Motivo de la cita"
            />

            <br /><br />

            <button onClick={solicitarCita}>
                Solicitar cita
            </button>
        </div>
    );
}
