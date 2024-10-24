/**
 * @description Interface para deletar uma folder no DataSource.
 *
 * @responsibility
 * - Define a operação de deletar uma folder no banco de dados.
 */
export interface DeleteAllUserFoldersDataSource {
    handle(folderId: number): Promise<void>;
}
