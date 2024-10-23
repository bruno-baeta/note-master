import { Folder } from '../../../models/Folder';

/**
 * @description Interface para o caso de uso de criar uma folder.
 *
 * @responsibility
 * - Define a operação de criar uma folder, aplicando regras de negócio como validações e formatações.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface CreateFolderUseCase {
  handle(folder: Folder): Promise<void>;
}
