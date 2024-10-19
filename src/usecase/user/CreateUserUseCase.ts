// src/domain/usecases/createUserUseCase.js
import { addUser } from '../../data/repositories/userRepository';

export const createUserUseCase = async (userName) => {
  try {
    const newUser = { id: Date.now(), name: userName, folders: [] }; // Inicializa com lista de pastas vazia
    await addUser(newUser); // Adiciona o usuário ao IndexedDB
    return newUser; // Retorna o usuário recém-criado
  } catch (error) {
    console.error('Erro ao criar usuário', error);
    throw error;
  }
};
