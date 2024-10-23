import { Folder } from '../../../models/Folder';

/**
 * @description Interface para o caso de uso de obter as subfolders de uma folder.
 *
 * @responsibility
 * - Define a operação de buscar subfolders de uma folder específica, aplicando validações.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface GetSubfoldersUseCase {
    handle(parentId: number): Promise<Folder[]>;
}
