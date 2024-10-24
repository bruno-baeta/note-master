import { IndexedDBManager } from "../../../IndexedDBManager";

const STORE_NAME = 'folders';
const DATABASE_NAME = 'notemaster';

export class DeleteAllUserFoldersDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(userId: number): Promise<void> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const folderStore = transaction.objectStore(STORE_NAME);

        const folderIndex = folderStore.index('userId');
        const folderRequest = folderIndex.openCursor(IDBKeyRange.only(userId));

        return new Promise((resolve, reject) => {
            folderRequest.onsuccess = function(event) {
                const request = event.target as IDBRequest;
                const cursor = request.result;

                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                } else {
                    resolve();
                }
            };

            folderRequest.onerror = () => reject(folderRequest.error);
        });
    }
}
