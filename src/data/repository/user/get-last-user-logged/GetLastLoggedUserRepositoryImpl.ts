import { GetLastLoggedUserRepository } from './GetLastLoggedUserRepository';
import { GetLastLoggedUserDataSource } from '../../../data-source/user/get-last-user-logged/GetLastLoggedUserDataSource';
import { User } from '../../../../domain/models/User';

export class GetLastLoggedUserRepositoryImpl implements GetLastLoggedUserRepository {

    constructor(
        private readonly dataSource: GetLastLoggedUserDataSource
    ) {}

    async handle(): Promise<User | undefined> {
        return await this.dataSource.handle();
    }
}
