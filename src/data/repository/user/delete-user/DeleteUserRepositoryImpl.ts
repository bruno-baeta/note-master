import { DeleteUserRepository } from './DeleteUserRepository';
import { DeleteUserDataSource } from '../../../data-source/user/delete-user/DeleteUserDataSource';
import {
    DeleteAllUserFoldersDataSource
} from "../../../data-source/folder/delete-all-user-folders/DeleteAllUserFoldersDataSource";

export class DeleteUserRepositoryImpl implements DeleteUserRepository {

    constructor(
        private readonly userDataSource: DeleteUserDataSource,
        private readonly deleteAllUserFoldersDataSource: DeleteAllUserFoldersDataSource,
    ) {}

    async handle(userId: number): Promise<void> {
        await this.deleteAllUserFoldersDataSource.handle(userId);
        await this.userDataSource.handle(userId);
    }
}
