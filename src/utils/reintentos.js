// IMPORTS siempre arriba
import { enviarCorreoCita, enviarCorreoEstadoPaciente } from "./email";

// =======================================================
//   SISTEMA DE REINTENTOS POR USUARIO
// =======================================================

// Guardar en cola por usuario
export function guardarEnCola(dato, emailUsuario) {
    const key = `colaCorreos_${emailUsuario}`;
    const cola = JSON.parse(localStorage.getItem(key) || "[]");
    cola.push(dato);
    localStorage.setItem(key, JSON.stringify(cola));
}

// Obtener cola por usuario
export function getColaCorreos(emailUsuario) {
    const key = `colaCorreos_${emailUsuario}`;
    return JSON.parse(localStorage.getItem(key) || "[]");
}

// Guardar cola actualizada
function setColaCorreos(emailUsuario, cola) {
    const key = `colaCorreos_${emailUsuario}`;
    localStorage.setItem(key, JSON.stringify(cola));
}

// =======================================================
//   PROCESAR COLA
// =======================================================
export async function procesarColaCorreos(emailUsuario) {

    if (!navigator.onLine) {
        console.log("⚠ No hay internet → no se procesó la cola.");
        return { enviados: 0, restantes: getColaCorreos(emailUsuario) };
    }

    const cola = getColaCorreos(emailUsuario);
    if (cola.length === 0) return { enviados: 0, restantes: [] };

    console.log(`🔄 Procesando cola del usuario: ${emailUsuario}`);

    let enviados = 0;
    const nuevaCola = [];

    for (let item of cola) {
        try {
            const { tipo, payload } = item;

            if (tipo === "correo_cita") {
                await enviarCorreoCita(payload, emailUsuario);
            }

            if (tipo === "correo_estado") {
                await enviarCorreoEstadoPaciente(payload, emailUsuario);
            }

            enviados++;

        } catch (error) {
            console.log("❌ Error al reenviar → permanece en cola");
            nuevaCola.push(item);
        }
    }

    // Guardar los que no pudieron enviarse
    setColaCorreos(emailUsuario, nuevaCola);

    return {
        enviados,
        restantes: nuevaCola
    };
}
