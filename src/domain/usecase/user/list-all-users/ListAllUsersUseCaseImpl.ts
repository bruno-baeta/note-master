import { ListAllUsersUseCase } from './ListAllUsersUseCase';
import { ListAllUsersRepository } from '../../../../data/repository/user/list-all-users/ListAllUsersRepository';
import { User } from '../../../models/User';

export class ListAllUsersUseCaseImpl implements ListAllUsersUseCase {

    constructor(
        private readonly repository: ListAllUsersRepository
    ) {}

    async handle(): Promise<User[]> {
        return await this.repository.handle();
    }
}
