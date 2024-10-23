import { useGetLastLoggedUser } from "./useGetLastLoggedUser";
import { useListAllUsers } from "./useListAllUsers";
import { useCreateUser } from "./useCreateUser";
import { useDeleteUser } from "./useDeleteUser";
import { useSaveLastLoggedUser } from "./useSaveLastLoggedUser";
import { useUpdateUser } from "./useUpdateUser";
import { User } from "../../../domain/models/User";
import { useEffect } from "react";

export const useUserManagement = () => {
    const { user, getLastLoggedUser } = useGetLastLoggedUser();
    const { listAllUsers, users } = useListAllUsers();
    const { createUser } = useCreateUser();
    const { deleteUser } = useDeleteUser();
    const { saveLastLoggedUser } = useSaveLastLoggedUser();
    const { updateUser } = useUpdateUser();

    useEffect(() => {
        reloadUsers();
    }, []);

    const reloadUsers = async () => {
        await getLastLoggedUser();
        await listAllUsers();
    };

    const handleCreateUser = async (userName: string) => {
        const newUser: User = { id: Date.now(), name: userName };
        await createUser(newUser);
        await saveLastLoggedUser(newUser);
        await reloadUsers();
    };

    const handleUpdateUser = async (newName: string, userId: number) => {
        const updatedUser: User = { id: userId, name: newName };
        await updateUser(updatedUser);
        await saveLastLoggedUser(updatedUser);
        await reloadUsers();
    };

    const handleDeleteUser = async (userId: number) => {
        await deleteUser(userId);
        const nextUser = users.length > 0 ? users[0] : { id: Date.now(), name: "Desconhecido" };
        await saveLastLoggedUser(nextUser);
        await reloadUsers();
    };

    const handleSelectUser = async (selectedUser: User) => {
        await saveLastLoggedUser(selectedUser);
        await reloadUsers();
    };

    return {
        user,
        users,
        reloadUsers,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
        handleSelectUser,
    };
};
