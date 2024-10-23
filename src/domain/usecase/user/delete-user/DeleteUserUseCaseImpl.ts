import { DeleteUserUseCase } from './DeleteUserUseCase';
import { DeleteUserRepository } from '../../../../data/repository/user/delete-user/DeleteUserRepository';

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {

    constructor(
        private readonly repository: DeleteUserRepository
    ) {}

    async handle(id: number): Promise<void> {
        await this.repository.handle(id);
    }
}
