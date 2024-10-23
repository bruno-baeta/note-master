import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para criar uma folder no DataSource.
 *
 * @responsibility
 * - Define a operação de criar uma folder no banco de dados.
 * - Pode receber `parentFolderId` para definir hierarquia.
 */
export interface CreateFolderDataSource {
    handle(folder: Folder): Promise<void>;
}
