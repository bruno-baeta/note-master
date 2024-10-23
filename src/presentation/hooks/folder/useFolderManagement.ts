import { useCreateFolder } from "./useCreateFolder";
import { Folder } from "../../../domain/models/Folder";
import { useGetFoldersByUser } from "./useGetFoldersByUser";

export const useFolderManagement = () => {
    const { createFolder } = useCreateFolder();
    const { folders, getFoldersByUser } = useGetFoldersByUser();

    const handleCreateFolder = async (folderName: string, userId: number) => {
        const newFolder: Folder = { name: folderName, parentId: 0, userId: userId };
        await createFolder(newFolder);
        await handleGetFoldersByUser(userId);
    };

    const handleGetFoldersByUser = async (userId: number) => {
        await getFoldersByUser(userId);
    };

    return {
        folders,
        handleCreateFolder,
        handleGetFoldersByUser,
    };
};
