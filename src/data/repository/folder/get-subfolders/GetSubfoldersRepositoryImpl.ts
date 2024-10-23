import { GetSubfoldersRepository } from './GetSubfoldersRepository';
import { GetSubfoldersDataSource } from '../../../data-source/folder/get-subfolders/GetSubfoldersDataSource';
import { Folder } from '../../../../domain/models/Folder';

export class GetSubfoldersRepositoryImpl implements GetSubfoldersRepository {

    constructor(
        private readonly dataSource: GetSubfoldersDataSource
    ) {}

    async handle(parentId: number): Promise<Folder[]> {
        return await this.dataSource.handle(parentId);
    }
}
