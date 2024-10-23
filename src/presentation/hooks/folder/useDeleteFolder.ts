import { useState } from 'react';
import { deleteFolderUseCase } from '../../../infra/dependency-injection/folder/DeleteFolderModule';

export const useDeleteFolder = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const deleteFolder = async (folderId: number) => {
        try {
            await deleteFolderUseCase.handle(folderId);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { deleteFolder, error, success };
};
