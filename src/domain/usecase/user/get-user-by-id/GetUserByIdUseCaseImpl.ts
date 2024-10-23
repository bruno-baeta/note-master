import { GetUserByIdUseCase } from './GetUserByIdUseCase';
import { GetUserByIdRepository } from '../../../../data/repository/user/get-user-by-id/GetUserByIdRepository';
import { User } from '../../../models/User';

export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {

    constructor(
        private readonly repository: GetUserByIdRepository
    ) {}

    async handle(id: number): Promise<User | undefined> {
        return await this.repository.handle(id);
    }
}
