import { User } from '../../../models/User';

/**
 * @description Interface para o caso de uso de obter o último usuário logado.
 *
 * @responsibility
 * - Define a operação de obter o último usuário logado, aplicando regras de negócio.
 */
export interface GetLastLoggedUserUseCase {
    handle(): Promise<User>;
}
