import { useState } from 'react';
import { User } from '../../../domain/models/User';
import {saveLastUserLoggedUseCase} from "../../../infra/dependency-injection/user/SaveLastUserLoggedModule";

export const useSaveLastLoggedUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const saveLastLoggedUser = async (user: User) => {
        try {
            await saveLastUserLoggedUseCase.handle(user);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { saveLastLoggedUser, error, success };
};
