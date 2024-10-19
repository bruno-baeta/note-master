// src/domain/usecases/getFoldersUseCase.js

import { getFolders } from '../../data/repositories/folderRepository';

export const getFoldersUseCase = async () => {
  try {
    const folders = getFolders();
    return folders;  // Retorna todas as pastas do repositório
  } catch (error) {
    console.error('Erro ao obter pastas', error);
    throw error;
  }
};
