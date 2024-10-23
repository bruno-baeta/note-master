import { Folder } from '../../../models/Folder';

/**
 * @description Interface para o caso de uso de atualizar uma folder.
 *
 * @responsibility
 * - Define a operação de atualizar uma folder, aplicando regras de negócio como validação.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface UpdateFolderUseCase {
    handle(folder: Folder): Promise<void>;
}
