import { GetFoldersByUserDataSource } from './GetFoldersByUserDataSource';
import { Folder } from '../../../../domain/models/Folder';
import { IndexedDBManager } from '../../../IndexedDBManager';

const STORE_NAME = 'folders';
const DATABASE_NAME = 'notemaster';

export class GetFoldersByUserDataSourceImpl implements GetFoldersByUserDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(userId: number): Promise<Folder[]> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.index('userId').getAll(userId);
            request.onsuccess = () => {
                transaction.oncomplete = () => {
                    const rootFolders = request.result.filter((folder: Folder) => folder.parentId === 0);
                    resolve(rootFolders);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
}
