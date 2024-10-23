import { User } from '../../../../domain/models/User';

/**
 * @description Interface para o repositório de salvar o último usuário logado.
 *
 * @responsibility
 * - Define a operação de salvar o último usuário logado no banco de dados.
 * - Pode realizar pequenas manipulações, como adicionar campos de auditoria.
 */
export interface SaveLastLoggedUserRepository {
    handle(user: User): Promise<void>;
}
