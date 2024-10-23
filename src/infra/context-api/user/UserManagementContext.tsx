import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { User } from '../../../domain/models/User';
import { Folder } from '../../../domain/models/Folder';
import { useUserManagement } from '../../../presentation/hooks/user/useUserManagement';
import { useFolderManagement } from '../../../presentation/hooks/folder/useFolderManagement';

interface ManagementContextProps {
    user: User;
    users: User[];
    folders: Folder[];
    handleCreateUser: (userName: string) => Promise<void>;
    handleUpdateUser: (newName: string, userId: number) => Promise<void>;
    handleDeleteUser: (userId: number) => Promise<void>;
    handleSelectUser: (selectedUser: User) => Promise<void>;
    handleCreateFolder: (folderName: string, userId: number) => Promise<void>;
}

type ProviderProps = {
    children: ReactNode;
};

const ManagementContext = createContext<ManagementContextProps | undefined>(undefined);

export const ManagementProvider = ({ children }: ProviderProps) => {
    const { user, users, handleCreateUser, handleUpdateUser, handleDeleteUser, handleSelectUser } = useUserManagement();
    const { folders, handleCreateFolder, handleGetFoldersByUser } = useFolderManagement();

    useEffect(() => {
        handleGetFoldersByUser(user.id);
    }, [user]);

    return (
        <ManagementContext.Provider
            value={{
                user,
                users,
                folders,
                handleCreateUser,
                handleUpdateUser,
                handleDeleteUser,
                handleSelectUser,
                handleCreateFolder,
            }}
        >
            {children}
        </ManagementContext.Provider>
    );
};

export const useManagementContext = () => {
    const context = useContext(ManagementContext);
    if (!context) {
        throw new Error("useManagementContext must be used within a ManagementProvider");
    }
    return context;
};
