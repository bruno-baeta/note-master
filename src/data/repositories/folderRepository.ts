// src/data/repositories/folderRepository.js
import { addFolder, getFolders, getFoldersByUserId, deleteFolder } from '../db';

export const createFolder = async (folder) => {
  return addFolder(folder);
};

export const fetchFolders = async () => {
  return getFolders();
};

export const fetchFoldersByUserId = async (userId) => {
  return getFoldersByUserId(userId);
};

export const removeFolder = async (folderId) => {
  return deleteFolder(folderId);
};
