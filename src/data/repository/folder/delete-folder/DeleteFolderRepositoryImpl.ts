import { DeleteFolderRepository } from './DeleteFolderRepository';
import { DeleteFolderDataSource } from '../../../data-source/folder/delete-folder/DeleteFolderDataSource';
import { Folder } from '../../../../domain/models/Folder';
import {GetSubfoldersDataSource} from "../../../data-source/folder/get-subfolders/GetSubfoldersDataSource";

export class DeleteFolderRepositoryImpl implements DeleteFolderRepository {
    constructor(
        private readonly dataSource: DeleteFolderDataSource,
        private readonly getSubfoldersDataSource: GetSubfoldersDataSource,
    ) {}

    async handle(folderId: number): Promise<void> {
        const subfolders: Folder[] = await this.getSubfoldersDataSource.handle(folderId);

        for (const subfolder of subfolders) {
            await this.handle(subfolder.id!!);
        }

        await this.dataSource.handle(folderId);
    }
}
