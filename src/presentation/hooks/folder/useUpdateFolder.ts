import { useState } from 'react';
import { Folder } from '../../../domain/models/Folder';
import { updateFolderUseCase } from "../../../infra/dependency-injection/folder/UpdateFolderModule";

export const useUpdateFolder = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateFolder = async (folder: Folder) => {
        try {
            await updateFolderUseCase.handle(folder);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { updateFolder, error, success };
};
