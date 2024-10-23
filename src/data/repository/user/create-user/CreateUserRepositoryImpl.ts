import { CreateUserRepository } from './CreateUserRepository';
import { CreateUserDataSource } from '../../../data-source/user/create-user/CreateUserDataSource';
import { User } from '../../../../domain/models/User';

export class CreateUserRepositoryImpl implements CreateUserRepository {

    constructor(
        private readonly dataSource: CreateUserDataSource
    ) {}

    async handle(user: User): Promise<void> {
        await this.dataSource.handle(user);
    }
}
