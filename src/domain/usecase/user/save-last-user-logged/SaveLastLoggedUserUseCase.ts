import { User } from '../../../models/User';

/**
 * @description Interface para o caso de uso de salvar o último usuário logado.
 *
 * @responsibility
 * - Define a operação de salvar o último usuário logado, aplicando regras de negócio.
 */
export interface SaveLastLoggedUserUseCase {
    handle(user: User): Promise<void>;
}
