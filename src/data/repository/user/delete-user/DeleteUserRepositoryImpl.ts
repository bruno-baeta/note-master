import { DeleteUserRepository } from './DeleteUserRepository';
import { DeleteUserDataSource } from '../../../data-source/user/delete-user/DeleteUserDataSource';

export class DeleteUserRepositoryImpl implements DeleteUserRepository {

    constructor(
        private readonly dataSource: DeleteUserDataSource
    ) {}

    async handle(id: number): Promise<void> {
        await this.dataSource.handle(id);
    }
}
