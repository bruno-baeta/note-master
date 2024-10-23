import { useState } from 'react';
import { Folder } from '../../../domain/models/Folder';
import { createFolderUseCase } from '../../../infra/dependency-injection/folder/CreateFolderModule';

export const useCreateFolder = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const createFolder = async (folder: Folder) => {
        try {
            await createFolderUseCase.handle(folder);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { createFolder, error, success };
};
