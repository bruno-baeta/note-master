import { useState } from 'react';
import { deleteUserUseCase } from "../../../infra/dependency-injection/user/DeleteUserModule";

export const useDeleteUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const deleteUser = async (userId: number) => {
        try {
            await deleteUserUseCase.handle(userId);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { deleteUser, error, success };
};
