/**
 * @description Interface para o caso de uso de deletar uma folder.
 *
 * @responsibility
 * - Define a operação de deletar uma folder, aplicando regras de negócio como validação.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface DeleteFolderUseCase {
    handle(folderId: number): Promise<void>;
}
