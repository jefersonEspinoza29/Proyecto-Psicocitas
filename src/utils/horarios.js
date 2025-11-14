// =============================
//        HORARIOS
// =============================

// Obtener horarios por email
export const getHorarios = (email) => {
  return JSON.parse(localStorage.getItem(`psicologo_horarios_${email}`)) || {};
};

// Guardar horarios por email
export const saveHorarios = (email, data) => {
  localStorage.setItem(`psicologo_horarios_${email}`, JSON.stringify(data));
};

// Generar horas por rango (1h)
export const generarHoras = (inicio, fin) => {
  if (!inicio || !fin) return [];

  const resultado = [];
  let h = parseInt(inicio.split(":")[0]);
  const hFin = parseInt(fin.split(":")[0]);

  while (h < hFin) {
    resultado.push(String(h).padStart(2, "0") + ":00");
    h++;
  }

  return resultado;
};






