import { useState, useEffect, useCallback } from "react";

// Utils
import {
    getCitasPorPsicologo,
    actualizarEstadoCita,
    eliminarCitaPorIndex,
    getCitaReal
} from "../../utils/citas";

import { getUserLogged, getUsuarios } from "../../utils/usuarios";

// Email
import { enviarCorreoEstadoPaciente } from "../../utils/email";

// Reintentos por usuario
import {
    getColaCorreos,
    procesarColaCorreos
} from "../../utils/reintentos";

export default function CitasPsicologo() {

    const user = getUserLogged();
    const emailUsuario = user.email; // ★ Cola individual del psicólogo
    const usuarios = getUsuarios();

    const [citas, setCitas] = useState([]);
    const [offline, setOffline] = useState(!navigator.onLine);
    const [pendientes, setPendientes] = useState([]);

    // ==================================================
    //   Cargar citas del psicólogo
    // ==================================================
    const cargarMisCitas = useCallback(() => {
        const lista = getCitasPorPsicologo(emailUsuario);
        setCitas(lista);
    }, [emailUsuario]);

    // ==================================================
    //   CARGA INICIAL + DETECTAR ONLINE/OFFLINE
    // ==================================================
    useEffect(() => {
        cargarMisCitas();
        setPendientes(getColaCorreos(emailUsuario)); // ★ Cola propia

        const handlerOnline = async () => {
            setOffline(false);

            const resultado = await procesarColaCorreos(emailUsuario);
            setPendientes(resultado.restantes);
        };

        const handlerOffline = () => setOffline(true);

        window.addEventListener("online", handlerOnline);
        window.addEventListener("offline", handlerOffline);

        return () => {
            window.removeEventListener("online", handlerOnline);
            window.removeEventListener("offline", handlerOffline);
        };

    }, [cargarMisCitas, emailUsuario]);

    // ==================================================
    //   CAMBIAR ESTADO + ENVIAR CORREO INDIVIDUAL
    // ==================================================
    const cambiarEstado = async (index, estadoNuevo) => {

        const cita = getCitaReal(emailUsuario, index);
        if (!cita) return;

        if (["atendida", "cancelada"].includes(cita.estado)) return;

        actualizarEstadoCita(emailUsuario, index, estadoNuevo);
        cargarMisCitas();

        const pacienteData = usuarios.find(u => u.nombre === cita.paciente);

        if (!pacienteData?.email) {
            console.error("Paciente no tiene email registrado");
            return;
        }

        try {
            await enviarCorreoEstadoPaciente(
                {
                    paciente: cita.paciente,
                    pacienteEmail: pacienteData.email,
                    psicologo: user.nombre,
                    fecha: cita.fecha,
                    hora: cita.hora,
                    motivo: cita.motivo,
                    estado: estadoNuevo
                },
                emailUsuario // ★ Cola de este psicólogo
            );

            alert("📧 Notificación enviada correctamente.");

        } catch (error) {

            if (error.message === "SIN_INTERNET") {
                alert("⚠ No hay internet. Se guardó en la COLA del psicólogo.");
            } else {
                alert("⚠ Error EmailJS. Notificación guardada en COLA.");
            }
        }

        setPendientes(getColaCorreos(emailUsuario));
    };

    // ==================================================
    //   ELIMINAR CITA
    // ==================================================
    const eliminarCita = (index) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta cita?")) return;
        eliminarCitaPorIndex(emailUsuario, index);
        cargarMisCitas();
    };

    const getColor = (estado) =>
        ({
            pendiente: "orange",
            aceptada: "blue",
            atendida: "green",
            cancelada: "red"
        }[estado] || "black");

    return (
        <div>
            <h2>Mis Citas</h2>

            {/* 🟡 Aviso de conexión */}
            {offline && (
                <p style={{ color: "red" }}>
                    ⚠ No tienes conexión. Las notificaciones se enviarán cuando vuelva el internet.
                </p>
            )}

            {/* 📨 Cola del psicólogo */}
            {pendientes.length > 0 && (
                <div style={{ background: "#ffeaa7", padding: 12, borderRadius: 8 }}>
                    <p>📬 Tienes <b>{pendientes.length}</b> correo(s) pendiente(s).</p>

                    <button
                        onClick={async () => {
                            if (!navigator.onLine) {
                                alert("❗ Aún no tienes conexión.");
                                return;
                            }

                            const resultado = await procesarColaCorreos(emailUsuario);
                            setPendientes(resultado.restantes);

                            if (resultado.enviados > 0) {
                                alert(`📨 ${resultado.enviados} correo(s) reenviado(s).`);
                            } else {
                                alert("❗ No se pudo reenviar ninguno.");
                            }
                        }}
                    >
                        Reintentar envío
                    </button>
                </div>
            )}

            {citas.length === 0 && <p>No tienes citas registradas.</p>}

            {citas.map((cita, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ccc",
                        padding: 15,
                        marginBottom: 10,
                        borderRadius: 5
                    }}
                >
                    <p><b>Paciente:</b> {cita.paciente}</p>
                    <p><b>Motivo:</b> {cita.motivo}</p>
                    <p><b>Fecha:</b> {cita.fecha}</p>
                    <p><b>Hora:</b> {cita.hora}</p>

                    <p>
                        <b>Estado:</b>{" "}
                        <span style={{ color: getColor(cita.estado) }}>
                            {cita.estado.toUpperCase()}
                        </span>
                    </p>

                    {/* Opciones según estado */}
                    {cita.estado === "pendiente" && (
                        <>
                            <button onClick={() => cambiarEstado(index, "aceptada")}>Aceptar</button>
                            <button onClick={() => cambiarEstado(index, "cancelada")}>Cancelar</button>
                        </>
                    )}

                    {cita.estado === "aceptada" && (
                        <>
                            <button onClick={() => cambiarEstado(index, "atendida")}>
                                Marcar como Atendida
                            </button>
                            <button onClick={() => cambiarEstado(index, "cancelada")}>
                                Cancelar
                            </button>
                        </>
                    )}

                    {["atendida", "cancelada"].includes(cita.estado) && (
                        <p style={{ color: "gray" }}>Esta cita ya no puede modificarse.</p>
                    )}

                    <button
                        style={{
                            marginLeft: 10,
                            background: "red",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: 4
                        }}
                        onClick={() => eliminarCita(index)}
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
}
