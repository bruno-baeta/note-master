import { User } from '../../../models/User';

/**
 * @description Interface para o caso de uso de listar todos os usuários.
 *
 * @responsibility
 * - Define a operação de listar todos os usuários, aplicando regras de negócio e validações.
 */
export interface ListAllUsersUseCase {
    handle(): Promise<User[]>;
}
