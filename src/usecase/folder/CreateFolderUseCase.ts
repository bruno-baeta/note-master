// src/domain/usecases/createFolderUseCase.js

import { addFolder } from '../../data/repositories/folderRepository';

export const createFolderUseCase = async (folderName) => {
  try {
    const newFolder = { id: Date.now(), name: folderName };
    const updatedFolders = addFolder(newFolder);
    return updatedFolders;  // Retorna a lista atualizada de pastas
  } catch (error) {
    console.error('Erro ao criar pasta', error);
    throw error;
  }
};
