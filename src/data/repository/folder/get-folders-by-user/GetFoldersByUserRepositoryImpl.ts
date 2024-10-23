import { GetFoldersByUserRepository } from './GetFoldersByUserRepository';
import { GetFoldersByUserDataSource } from '../../../data-source/folder/get-folders-by-user/GetFoldersByUserDataSource';
import { Folder } from '../../../../domain/models/Folder';

export class GetFoldersByUserRepositoryImpl implements GetFoldersByUserRepository {

    constructor(
        private readonly dataSource: GetFoldersByUserDataSource
    ) {}

    async handle(userId: number): Promise<Folder[]> {
        return await this.dataSource.handle(userId);
    }
}
