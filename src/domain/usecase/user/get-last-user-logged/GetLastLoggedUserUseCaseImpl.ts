import { GetLastLoggedUserUseCase } from './GetLastLoggedUserUseCase';
import { GetLastLoggedUserRepository } from '../../../../data/repository/user/get-last-user-logged/GetLastLoggedUserRepository';
import { User } from '../../../models/User';
import {SaveLastLoggedUserUseCase} from "../save-last-user-logged/SaveLastLoggedUserUseCase";
import {CreateUserUseCase} from "../create-user/CreateUserUseCase";

export class GetLastLoggedUserUseCaseImpl implements GetLastLoggedUserUseCase {
    constructor(
        private readonly getRepository: GetLastLoggedUserRepository,
        private readonly saveLastLoggedUseCase: SaveLastLoggedUserUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
    ) {}

    async handle(): Promise<User> {
        const lastLoggedUser = await this.getRepository.handle();

        if (!lastLoggedUser) {
            const unknownUser: User = { id: Date.now(), name: "Desconhecido" };
            await this.createUserUseCase.handle(unknownUser);
            await this.saveLastLoggedUseCase.handle(unknownUser);
            return unknownUser;
        }

        return lastLoggedUser;
    }
}
