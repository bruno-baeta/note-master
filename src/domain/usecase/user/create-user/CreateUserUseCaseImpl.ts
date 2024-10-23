import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserRepository } from '../../../../data/repository/user/create-user/CreateUserRepository';
import { User } from '../../../models/User';

export class CreateUserUseCaseImpl implements CreateUserUseCase {

    constructor(
        private readonly repository: CreateUserRepository
    ) {}

    async handle(user: User): Promise<void> {
        await this.repository.handle(user);
    }
}
