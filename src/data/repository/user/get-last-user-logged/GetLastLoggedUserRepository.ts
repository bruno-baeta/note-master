import { User } from '../../../../domain/models/User';

/**
 * @description Interface para o repositório de obter o último usuário logado.
 *
 * @responsibility
 * - Define a operação de obter o último usuário logado no banco de dados.
 * - Pode realizar pequenas manipulações ou verificações antes de retornar os dados.
 */
export interface GetLastLoggedUserRepository {
    handle(): Promise<User | undefined>;
}
