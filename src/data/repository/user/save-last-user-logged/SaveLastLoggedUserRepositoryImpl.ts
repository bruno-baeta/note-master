import { SaveLastLoggedUserRepository } from './SaveLastLoggedUserRepository';
import { SaveLastLoggedUserDataSource } from '../../../data-source/user/save-last-user-logged/SaveLastLoggedUserDataSource'
import { User } from '../../../../domain/models/User';

export class SaveLastLoggedUserRepositoryImpl implements SaveLastLoggedUserRepository {

    constructor(
        private readonly dataSource: SaveLastLoggedUserDataSource
    ) {}

    async handle(user: User): Promise<void> {
        await this.dataSource.handle(user);
    }
}
