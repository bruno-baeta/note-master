import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { User } from '../../../domain/models/User';
import { Folder } from '../../../domain/models/Folder';
import { useUserManagement } from '../../../presentation/hooks/user/useUserManagement';
import { useFolderManagement } from '../../../presentation/hooks/folder/useFolderManagement';

interface ManagementContextProps {
    user: User;
    users: User[];
    folders: Folder[];
    subfolders: Folder[];
    handleCreateUser: (userName: string) => Promise<void>;
    handleUpdateUser: (newName: string, userId: number) => Promise<void>;
    handleDeleteUser: (userId: number) => Promise<void>;
    handleSelectUser: (selectedUser: User) => Promise<void>;
    handleCreateFolder: (folderName: string, userId: number, parentId: number) => Promise<void>;
    handleUpdateFolder: (name: string, folder: Folder) => Promise<void>;
    handleDeleteFolder: (folderId: number, userId: number) => Promise<void>;
    handleGetSubfolders: (parentId: number) => Promise<void>;
}

type ProviderProps = {
    children: ReactNode;
};

const ManagementContext = createContext<ManagementContextProps | undefined>(undefined);

export const ManagementContextProvider = ({ children }: ProviderProps) => {
    const {
        user,
        users,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
        handleSelectUser
    } = useUserManagement();

    const {
        folders,
        subfolders,
        handleCreateFolder,
        handleGetFoldersByUser,
        handleDeleteFolder,
        handleUpdateFolder,
        handleGetSubfolders,
    } = useFolderManagement();

    useEffect(() => {
        handleGetFoldersByUser(user.id);
    }, [user]);

    return (
        <ManagementContext.Provider
            value={{
                user,
                users,
                folders,
                subfolders,
                handleCreateUser,
                handleUpdateUser,
                handleDeleteUser,
                handleSelectUser,
                handleCreateFolder,
                handleUpdateFolder,
                handleDeleteFolder,
                handleGetSubfolders,
            }}
        >
            {children}
        </ManagementContext.Provider>
    );
};

export const useManagementContext = () => {
    const context = useContext(ManagementContext);
    if (!context) {
        throw new Error("useManagementContext must be used within a ManagementContextProvider");
    }
    return context;
};
