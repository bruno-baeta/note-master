import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para obter as folders de um usuário no DataSource.
 *
 * @responsibility
 * - Define a operação de obter as folders de um usuário, filtrando pela raiz (root) e `parentFolderId = 0`.
 */
export interface GetFoldersByUserDataSource {
    handle(userId: number): Promise<Folder[]>;
}
