import { useState } from 'react';
import { User } from '../../../domain/models/User';
import { getUserByIdUseCase } from '../../../infra/dependency-injection/user/GetUserByIdModule';

export const useGetUserById = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    const getUserById = async (userId: number) => {
        try {
            const fetchedUser = await getUserByIdUseCase.handle(userId);
            setUser(fetchedUser);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { user, error, getUserById };
};
