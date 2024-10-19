import { openDB } from 'idb';

const initDB = async () => {
  return openDB('notemaster', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('folders')) {
        db.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Métodos para pastas
export const addFolder = async (folder) => {
  const db = await initDB();
  return db.put('folders', folder);
};

export const getFolders = async () => {
  const db = await initDB();
  return db.getAll('folders');
};

export const getFoldersByUserId = async (userId) => {
  const db = await initDB();
  const folders = await db.getAll('folders');
  return folders.filter((folder) => folder.userId === userId);
};

export const deleteFolder = async (id) => {
  const db = await initDB();
  return db.delete('folders', id);
};

// Métodos para anotações
export const addNote = async (note) => {
  const db = await initDB();
  return db.put('notes', note);
};

export const getNotes = async () => {
  const db = await initDB();
  return db.getAll('notes');
};

// Métodos para usuários
export const addUser = async (user) => {
  const db = await initDB();
  return db.put('users', user);
};

export const getUsers = async () => {
  const db = await initDB();
  return db.getAll('users');
};

export const getLastLoggedUser = async () => {
  const db = await initDB();
  const users = await db.getAll('users');
  return users.length ? users[users.length - 1] : null;
};

export const deleteUser = async (id) => {
  const db = await initDB();
  return db.delete('users', id);
};
