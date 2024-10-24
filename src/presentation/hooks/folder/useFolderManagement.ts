import { useCreateFolder } from "./useCreateFolder";
import { Folder } from "../../../domain/models/Folder";
import { useGetFoldersByUser } from "./useGetFoldersByUser";
import {useUpdateFolder} from "./useUpdateFolder";
import {useDeleteFolder} from "./useDeleteFolder";
import {useGetSubfolders} from "./useGetSubfolders";

export const useFolderManagement = () => {
    const { createFolder } = useCreateFolder();
    const { updateFolder } = useUpdateFolder();
    const { deleteFolder } = useDeleteFolder();
    const { subfolders, getSubfolders } = useGetSubfolders();
    const { folders, getFoldersByUser } = useGetFoldersByUser();

    const handleCreateFolder = async (folderName: string, userId: number, parentId: number) => {
        const newFolder: Folder = { name: folderName, parentId: parentId, userId: userId };
        await createFolder(newFolder);
        await handleGetFoldersByUser(userId);
        await handleGetSubfolders(parentId);
    };

    const handleDeleteFolder = async (folderId: number, userId: number) => {
        await deleteFolder(folderId);
        await handleGetFoldersByUser(userId)
    }

    const handleUpdateFolder = async (name: string, folder: Folder) => {
        const updatedFolder = { ...folder, name }
        await updateFolder(updatedFolder)
        await handleGetFoldersByUser(folder.userId)
        await handleGetSubfolders(folder.parentId);
    }

    const handleGetSubfolders = async (parentId: number) => {
        await getSubfolders(parentId)
    }

    const handleGetFoldersByUser = async (userId: number) => {
        await getFoldersByUser(userId);
    };

    return {
        folders,
        subfolders,
        handleCreateFolder,
        handleGetFoldersByUser,
        handleDeleteFolder,
        handleUpdateFolder,
        handleGetSubfolders,
    };
};
