import { useState} from 'react';
import { getLastUserLoggedUseCase } from "../../../infra/dependency-injection/user/GetLastUserLoggedModule";
import { User } from "../../../domain/models/User";

export const useGetLastLoggedUser = () => {
    const unknownUser = { id: Date.now(), name: 'Desconhecido'}
    const [user, setUser] = useState<User>(unknownUser);
    const [error, setError] = useState<string>('');

    const getLastLoggedUser = async () => {
        try {
            const lastLoggedUser = await getLastUserLoggedUseCase.handle();
            setUser(lastLoggedUser);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { getLastLoggedUser, error, user };
};
