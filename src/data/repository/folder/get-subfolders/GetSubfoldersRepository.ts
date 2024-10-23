import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para o repositório de buscar subfolders.
 *
 * @responsibility
 * - Define a operação de buscar subfolders a partir de uma `parentFolderId`.
 * - Ajusta ou valida os dados antes de buscar no DataSource.
 */
export interface GetSubfoldersRepository {
    handle(parentId: number): Promise<Folder[]>;
}
