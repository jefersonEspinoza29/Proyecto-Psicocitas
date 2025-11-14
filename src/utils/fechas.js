// =============================
//       FECHAS / DÍAS
// =============================

export const diasSemana = [
  "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
];

export const obtenerDiaSemana = (fechaStr) => {
  const fechaObj = new Date(fechaStr + "T00:00");
  return diasSemana[fechaObj.getDay()];
};

// Validar que fecha no sea pasada
export const fechaEsPasada = (fechaStr) => {
  const hoy = new Date();
  const fecha = new Date(fechaStr + "T00:00");
  return fecha < new Date(hoy.toDateString());
};
