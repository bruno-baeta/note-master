import {useGetLastLoggedUser} from "./useGetLastLoggedUser";
import {useListAllUsers} from "./useListAllUsers";
import {useCreateUser} from "./useCreateUser";
import {useDeleteUser} from "./useDeleteUser";
import {useSaveLastLoggedUser} from "./useSaveLastLoggedUser";
import {useUpdateUser} from "./useUpdateUser";
import {User} from "../../../domain/models/User";
import {useEffect} from "react";
import {useGetFoldersByUser} from "../folder/useGetFoldersByUser";

export const useUserManagement = () => {
    const {user, getLastLoggedUser} = useGetLastLoggedUser();
    const {listAllUsers, users} = useListAllUsers();
    const {createUser} = useCreateUser();
    const {deleteUser} = useDeleteUser();
    const {saveLastLoggedUser} = useSaveLastLoggedUser();
    const {updateUser} = useUpdateUser();
    const { folders, getFoldersByUser} = useGetFoldersByUser();

    useEffect(() => {
        const initializeUsers = async () => {
            await reloadUsers()
        }

        initializeUsers();
    }, []);

    const reloadUsers = async () => {
        await getLastLoggedUser();
        await listAllUsers();
    };

    const handleCreateUser = async (userName: string) => {
        const newUser: User = {id: Date.now(), name: userName};
        await createUser(newUser);
        await saveLastLoggedUser(newUser);
        await getFoldersByUser(user.id)
        await reloadUsers();
    };

    const handleUpdateUser = async (newName: string) => {
        const updatedUser: User = {...user, name: newName};
        await updateUser(updatedUser);
        await saveLastLoggedUser(updatedUser);
        await getFoldersByUser(user.id)
        await reloadUsers();
    };

    const handleDeleteUser = async () => {
        await deleteUser(user.id);
        const nextUser = users.length > 0 ? users[0] : {id: Date.now(), name: "Desconhecido"};
        await saveLastLoggedUser(nextUser);
        await getFoldersByUser(user.id);
        await reloadUsers();
    };

    const handleSelectUser = async (selectedUser: User) => {
        await saveLastLoggedUser(selectedUser);
        await getFoldersByUser(user.id)
        await reloadUsers();
    };

    return {
        user,
        users,
        folders,
        reloadUsers,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
        handleSelectUser,
        getFoldersByUser,
    };
};
