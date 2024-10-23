import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UpdateUserRepository } from '../../../../data/repository/user/update-user/UpdateUserRepository';
import { User } from '../../../models/User';

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {

    constructor(
        private readonly repository: UpdateUserRepository
    ) {}

    async handle(user: User): Promise<void> {
        await this.repository.handle(user);
    }
}
