import { User } from '../../../../domain/models/User';

/**
 * @description Interface para o repositório de listar todos os usuários.
 *
 * @responsibility
 * - Define a operação de listar todos os usuários, ajustando dados se necessário.
 */
export interface ListAllUsersRepository {
    handle(): Promise<User[]>;
}
