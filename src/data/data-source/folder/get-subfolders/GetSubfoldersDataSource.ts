import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para buscar subfolders no DataSource.
 *
 * @responsibility
 * - Define a operação de buscar as subfolders com base no `parentFolderId`.
 * - Retorna todas as subfolders que pertencem a uma folder específica.
 */
export interface GetSubfoldersDataSource {
    handle(parentId: number): Promise<Folder[]>;
}
