import { DeleteFolderRepository } from './DeleteFolderRepository';
import { DeleteFolderDataSource } from '../../../data-source/folder/delete-folder/DeleteFolderDataSource';

export class DeleteFolderRepositoryImpl implements DeleteFolderRepository {

    constructor(
        private readonly dataSource: DeleteFolderDataSource
    ) {}

    async handle(folderId: number): Promise<void> {
        await this.dataSource.handle(folderId);
    }
}
