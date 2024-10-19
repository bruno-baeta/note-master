// src/data/repositories/userRepository.js
import { addUser, getUsers, getLastLoggedUser, saveLastLoggedUser, deleteUser } from '../../data/db';

export const createUser = async (user) => {
  return addUser(user);
};

export const fetchUsers = async () => {
  return getUsers();
};

export const fetchLastLoggedUser = async () => {
  return getLastLoggedUser();
};

export const saveLoggedUser = async () => {
  return saveLastLoggedUser();
}

export const removeUser = async (userId) => {
  return deleteUser(userId);
};
