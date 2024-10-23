import {useEffect, useState} from 'react';
import { User } from '../../../domain/models/User';
import {listAllUsersUseCase} from "../../../infra/dependency-injection/user/ListAllUsersModule";

export const useListAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const listAllUsers = async () => {
        try {
            const fetchedUsers = await listAllUsersUseCase.handle();
            setUsers(fetchedUsers);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { users, error, listAllUsers };
};
