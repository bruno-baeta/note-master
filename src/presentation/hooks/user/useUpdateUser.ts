import { useState } from 'react';
import { User } from '../../../domain/models/User';
import { updateUserUseCase } from '../../../infra/dependency-injection/user/UpdateUserModule';

export const useUpdateUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateUser = async (user: User) => {
        try {
            await updateUserUseCase.handle(user);
            setSuccess(true);
        } catch (err) {
            console.log('err: ', err)
            setError((err as Error).message);
        }
    };

    return { updateUser, error, success };
};
