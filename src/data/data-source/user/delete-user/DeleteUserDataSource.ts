/**
 * @description Interface para remover um usuário no DataSource.
 *
 * @responsibility
 * - Define a operação de remoção de um usuário no banco de dados.
 * - Não faz validações ou manipulações de dados, apenas remove o dado.
 */
export interface DeleteUserDataSource {
    handle(id: number): Promise<void>;
}
