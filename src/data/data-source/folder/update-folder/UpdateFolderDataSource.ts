import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para atualizar uma folder no DataSource.
 *
 * @responsibility
 * - Define a operação de atualizar uma folder no banco de dados.
 */
export interface UpdateFolderDataSource {
    handle(folder: Folder): Promise<void>;
}
