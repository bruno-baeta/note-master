import { SaveLastLoggedUserUseCase } from './SaveLastLoggedUserUseCase';
import { SaveLastLoggedUserRepository } from '../../../../data/repository/user/save-last-user-logged/SaveLastLoggedUserRepository';
import { User } from '../../../models/User';

export class SaveLastLoggedUserUseCaseImpl implements SaveLastLoggedUserUseCase {

    constructor(
        private readonly repository: SaveLastLoggedUserRepository
    ) {}

    async handle(user: User): Promise<void> {
        await this.repository.handle(user);
    }
}
