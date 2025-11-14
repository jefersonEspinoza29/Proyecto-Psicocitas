// Obtener lista de usuarios
export const getUsuarios = () => {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
};

// Guardar lista de usuarios
export const setUsuarios = (lista) => {
  localStorage.setItem("usuarios", JSON.stringify(lista));
};

// Actualizar datos de un usuario
export const updateUsuario = (email, nuevosDatos) => {
  let users = getUsuarios();

  users = users.map((u) =>
    u.email === email ? { ...u, ...nuevosDatos } : u
  );

  setUsuarios(users);
};

// Obtener usuario logueado
export const getUserLogged = () => {
  return JSON.parse(localStorage.getItem("userLogged")) || null;
};

// Guardar usuario logueado (actualizar sesión)
export const setUserLogged = (data) => {
  localStorage.setItem("userLogged", JSON.stringify(data));
};



