// Simulación de una "base de datos" de usuarios, para poder probar el
// flujo completo de registro + login sin backend real.

const USERS_STORAGE_KEY = "huertohogar-users";

export function getUsers() {
  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function findUserByEmail(email) {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// Devuelve el usuario creado, o null si el correo ya estaba registrado.
export function addUser({ name, email, password, phone, address }) {
  if (findUserByEmail(email)) return null;

  const user = { id: "user-" + Date.now(), name, email, password, phone, address };
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
}

// Valida credenciales contra la "BD". Devuelve el usuario si coinciden, o null.
export function validateLogin(email, password) {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return null;
  return user;
}
