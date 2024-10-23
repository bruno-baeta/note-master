import { GetUserByIdRepository } from './GetUserByIdRepository';
import { GetUserByIdDataSource } from '../../../data-source/user/get-user-by-id/GetUserByIdDataSource';
import { User } from '../../../../domain/models/User';

export class GetUserByIdRepositoryImpl implements GetUserByIdRepository {

    constructor(
        private readonly dataSource: GetUserByIdDataSource
    ) {}

    async handle(id: number): Promise<User | undefined> {
        return await this.dataSource.handle(id);
    }
}
