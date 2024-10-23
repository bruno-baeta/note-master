import { ListAllUsersRepository } from './ListAllUsersRepository';
import { ListAllUsersDataSource } from '../../../data-source/user/list-all-users/ListAllUsersDataSource';
import { User } from '../../../../domain/models/User';

export class ListAllUsersRepositoryImpl implements ListAllUsersRepository {

    constructor(
        private readonly dataSource: ListAllUsersDataSource
    ) {}

    async handle(): Promise<User[]> {
        return await this.dataSource.handle();
    }
}
