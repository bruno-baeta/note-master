/**
 * @description Interface para o caso de uso de deletar um usuário.
 *
 * @responsibility
 * - Define a operação de deletar um usuário, aplicando regras de negócio e validações.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface DeleteUserUseCase {
    handle(id: number): Promise<void>;
}
