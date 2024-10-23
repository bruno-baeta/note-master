/**
 * @description Interface para o repositório de deletar usuário.
 *
 * @responsibility
 * - Define a operação de deleter um usuário do banco de dados, ajustando ou validando dados antes da exclusão.
 * - Pode aplicar validações como a verificação de permissões antes da exclusão.
 */
export interface DeleteUserRepository {
    handle(id: number): Promise<void>;
}
