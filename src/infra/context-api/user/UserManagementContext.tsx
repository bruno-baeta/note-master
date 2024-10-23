import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '../../../domain/models/User';
import { useUserManagement } from "../../../presentation/hooks/user/useUserManagement";
import {Folder} from "../../../domain/models/Folder";

interface UserManagementContextProps {
    user: User;
    users: User[];
    folders: Folder[];
    handleCreateUser: (userName: string) => Promise<void>;
    handleUpdateUser: (newName: string) => Promise<void>;
    handleDeleteUser: () => Promise<void>;
    handleSelectUser: (selectedUser: User) => Promise<void>;
    getFoldersByUser: (userId: number) => Promise<void>;
}

type UserProviderProps = {
    children: ReactNode;
};

const UserManagementContext = createContext<UserManagementContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
    const userManagement = useUserManagement();

    return (
        <UserManagementContext.Provider value={userManagement}>
            {children}
        </UserManagementContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserManagementContext);
    if (!context) throw new Error("useUserContext must be used within a UserProvider");
    return context;
};
