import { DeleteFolderUseCase } from './DeleteFolderUseCase';
import { DeleteFolderRepository } from '../../../../data/repository/folder/delete-folder/DeleteFolderRepository';

export class DeleteFolderUseCaseImpl implements DeleteFolderUseCase {

    constructor(
        private readonly repository: DeleteFolderRepository
    ) {}

    async handle(folderId: number): Promise<void> {
        await this.repository.handle(folderId);
    }
}
