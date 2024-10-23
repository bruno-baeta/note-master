/**
 * @description Interface para o repositório de deletar uma folder.
 *
 * @responsibility
 * - Define a operação de deletar uma folder, ajustando dados antes de passar para o DataSource.
 */
export interface DeleteFolderRepository {
    handle(folderId: number): Promise<void>;
}
