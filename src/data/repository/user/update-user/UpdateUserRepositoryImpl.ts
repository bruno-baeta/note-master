import { UpdateUserRepository } from './UpdateUserRepository';
import { UpdateUserDataSource } from '../../../data-source/user/update-user/UpdateUserDataSource';
import { User } from '../../../../domain/models/User';

export class UpdateUserRepositoryImpl implements UpdateUserRepository {

    constructor(
        private readonly dataSource: UpdateUserDataSource
    ) {}

    async handle(user: User): Promise<void> {
        await this.dataSource.handle(user);
    }
}
