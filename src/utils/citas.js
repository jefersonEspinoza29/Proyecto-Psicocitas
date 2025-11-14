// Obtener TODAS las citas
export const getCitas = () =>
  JSON.parse(localStorage.getItem("citas")) || [];

// Guardar citas
export const setCitas = (lista) =>
  localStorage.setItem("citas", JSON.stringify(lista));

// Obtener citas por psicólogo
export const getCitasPorPsicologo = (email) => {
  return getCitas().filter(c => c.psicologoEmail === email);
};

// Actualizar estado de una cita
export const actualizarEstadoCita = (psicologoEmail, index, nuevoEstado) => {
  const citas = getCitas();

  const indicesReales = citas
    .map((c, i) => ({ ...c, indexReal: i }))
    .filter(c => c.psicologoEmail === psicologoEmail);

  const real = indicesReales[index].indexReal;

  citas[real].estado = nuevoEstado;
  setCitas(citas);
};

// Eliminar una cita
export const eliminarCitaPorIndex = (psicologoEmail, index) => {
  let citas = getCitas();

  const indicesReales = citas
    .map((c, i) => ({ ...c, indexReal: i }))
    .filter(c => c.psicologoEmail === psicologoEmail);

  const real = indicesReales[index].indexReal;

  citas.splice(real, 1);
  setCitas(citas);
};


export const ordenarCitas = (lista) => {
  return [...lista].sort((a, b) => {
    const A = new Date(a.fecha + " " + (a.hora || "00:00"));
    const B = new Date(b.fecha + " " + (b.hora || "00:00"));
    return A - B;
  });
};

export const contarEstados = (citas) => ({
  pendientes: citas.filter(c => c.estado === "pendiente").length,
  aceptadas:  citas.filter(c => c.estado === "aceptada").length,
  canceladas: citas.filter(c => c.estado === "cancelada").length,
  atendidas:  citas.filter(c => c.estado === "atendida").length
});

export const crearCita = (cita) => {
  const citas = getCitas();
  citas.push(cita);
  setCitas(citas);
};

export const horaOcupada = (email, fecha, hora) => {
  return getCitas().some(c =>
    c.psicologoEmail === email &&
    c.fecha === fecha &&
    c.hora === hora &&
    (c.estado === "pendiente" || c.estado === "aceptada")
  );
};

export const getCitasPorPaciente = (nombrePaciente) => {
  return getCitas().filter(c => c.paciente === nombrePaciente);
};


// Obtener una cita real del array completo usando el índice filtrado
export const getCitaReal = (psicologoEmail, index) => {
  const citas = getCitas();

  // Mapea citas reales según el psicólogo
  const filtradas = citas
    .map((c, i) => ({ ...c, realIndex: i }))
    .filter(c => c.psicologoEmail === psicologoEmail);

  return filtradas[index] || null;
};
