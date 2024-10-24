import { useCreateFolder } from "./useCreateFolder";
import { Folder } from "../../../domain/models/Folder";
import { useGetFoldersByUser } from "./useGetFoldersByUser";
import {useUpdateFolder} from "./useUpdateFolder";
import {useDeleteFolder} from "./useDeleteFolder";

export const useFolderManagement = () => {
    const { createFolder } = useCreateFolder();
    const { updateFolder } = useUpdateFolder();
    const { deleteFolder } = useDeleteFolder();
    const { folders, getFoldersByUser } = useGetFoldersByUser();

    const handleCreateFolder = async (folderName: string, userId: number) => {
        const newFolder: Folder = { name: folderName, parentId: 0, userId: userId };
        await createFolder(newFolder);
        await handleGetFoldersByUser(userId);
    };

    const handleDeleteFolder = async (folderId: number, userId: number) => {
        await deleteFolder(folderId);
        await handleGetFoldersByUser(userId)
    }

    const handleUpdateFolder = async (name: string, folder: Folder) => {
        const updatedFolder = { ...folder, name }
        await updateFolder(updatedFolder)
        await handleGetFoldersByUser(folder.userId)
    }

    const handleGetFoldersByUser = async (userId: number) => {
        await getFoldersByUser(userId);
    };

    return {
        folders,
        handleCreateFolder,
        handleGetFoldersByUser,
        handleDeleteFolder,
        handleUpdateFolder,
    };
};
