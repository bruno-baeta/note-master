import { User } from '../../../../domain/models/User';

/**
 * @description Interface para o repositório de atualizar usuário.
 *
 * @responsibility
 * - Define a operação de atualizar usuário, ajustando dados ou aplicando validações antes de atualizar.
 * - Pode adicionar campos de auditoria como `updatedAt` antes de atualizar.
 */
export interface UpdateUserRepository {
    handle(user: User): Promise<void>;
}
