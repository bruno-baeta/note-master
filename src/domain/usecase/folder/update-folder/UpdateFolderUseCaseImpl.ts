import { UpdateFolderUseCase } from './UpdateFolderUseCase';
import { UpdateFolderRepository } from '../../../../data/repository/folder/update-folder/UpdateFolderRepository';
import { Folder } from '../../../models/Folder';

export class UpdateFolderUseCaseImpl implements UpdateFolderUseCase {

    constructor(
        private readonly repository: UpdateFolderRepository
    ) {}

    async handle(folder: Folder): Promise<void> {
        await this.repository.handle(folder);
    }
}
