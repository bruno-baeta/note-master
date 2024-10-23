import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para o repositório de atualizar uma folder.
 *
 * @responsibility
 * - Define a operação de atualizar uma folder, ajustando dados antes de passar para o DataSource.
 */
export interface UpdateFolderRepository {
    handle(folder: Folder): Promise<void>;
}
