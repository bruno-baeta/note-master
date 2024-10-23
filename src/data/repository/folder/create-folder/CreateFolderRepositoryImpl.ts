import { CreateFolderRepository } from './CreateFolderRepository';
import { CreateFolderDataSource } from '../../../data-source/folder/create-folder/CreateFolderDataSource';
import { Folder } from '../../../../domain/models/Folder';

export class CreateFolderRepositoryImpl implements CreateFolderRepository {

    constructor(
        private readonly dataSource: CreateFolderDataSource
    ) {}

    async handle(folder: Folder): Promise<void> {
        await this.dataSource.handle(folder);
    }
}
