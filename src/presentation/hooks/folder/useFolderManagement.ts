import {useCreateFolder} from "./useCreateFolder";
import {Folder} from "../../../domain/models/Folder";
import {useUserContext} from "../../../infra/context-api/user/UserManagementContext";

export const useFolderManagement = () => {
    const { createFolder } = useCreateFolder();
    const { user, folders, getFoldersByUser,  } = useUserContext();

    const handleCreateFolder = async (folderName: string) => {
        const newFolder: Folder = { name: folderName, parentId: 0, userId: user.id };
        await createFolder(newFolder);
        await getFoldersByUser(user.id);
    };

    return {
        folders,
        handleCreateFolder,
    };
};
