import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para o repositório de criar uma folder.
 *
 * @responsibility
 * - Define a operação de criar uma folder, ajustando dados antes de passar para o DataSource.
 * - Pode ajustar `parentFolderId` para lidar com hierarquia.
 */
export interface CreateFolderRepository {
    handle(folder: Folder): Promise<void>;
}
