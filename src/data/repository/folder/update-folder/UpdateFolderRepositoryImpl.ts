import { UpdateFolderRepository } from './UpdateFolderRepository';
import { UpdateFolderDataSource } from '../../../data-source/folder/update-folder/UpdateFolderDataSource';
import { Folder } from '../../../../domain/models/Folder';

export class UpdateFolderRepositoryImpl implements UpdateFolderRepository {

    constructor(
        private readonly dataSource: UpdateFolderDataSource
    ) {}

    async handle(folder: Folder): Promise<void> {
        await this.dataSource.handle(folder);
    }
}
