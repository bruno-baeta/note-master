import { UpdateFolderDataSource } from './UpdateFolderDataSource';
import { Folder } from '../../../../domain/models/Folder';
import { IndexedDBManager } from '../../../IndexedDBManager';

const STORE_NAME = 'folders';
const DATABASE_NAME = 'notemaster';

export class UpdateFolderDataSourceImpl implements UpdateFolderDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(folder: Folder): Promise<void> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(folder);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                transaction.oncomplete = () => resolve();
            };
            request.onerror = () => reject(request.error);
        });
    }
}
