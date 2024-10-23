import { useState } from 'react';
import { Folder } from '../../../domain/models/Folder';
import { getFoldersByUserUseCase } from '../../../infra/dependency-injection/folder/GetFoldersByUserModule';

export const useGetFoldersByUser = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getFoldersByUser = async (userId: number) => {
        try {
            const fetchedFolders = await getFoldersByUserUseCase.handle(userId);
            setFolders(fetchedFolders);
        } catch (err) {
            console.log(err)
            setError((err as Error).message);
        }
    };

    return { folders, error, getFoldersByUser };
};
