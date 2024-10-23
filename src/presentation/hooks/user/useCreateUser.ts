import { useState } from 'react';
import { User } from '../../../domain/models/User';
import { createUserUseCase } from '../../../infra/dependency-injection/user/CreateUserModule';

export const useCreateUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const createUser = async (user: User) => {
        try {
            await createUserUseCase.handle(user);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { createUser, error, success };
};
