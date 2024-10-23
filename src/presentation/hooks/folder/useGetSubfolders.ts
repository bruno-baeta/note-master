import { useState } from 'react';
import { Folder } from '../../../domain/models/Folder';
import { getSubfoldersUseCase } from '../../../infra/dependency-injection/folder/GetSubfoldersModule';

export const useGetSubfolders = () => {
    const [subfolders, setSubfolders] = useState<Folder[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getSubfolders = async (parentId: number) => {
        try {
            const fetchedSubfolders = await getSubfoldersUseCase.handle(parentId);
            setSubfolders(fetchedSubfolders);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { getSubfolders, subfolders, error };
};
