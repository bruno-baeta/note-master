export class IndexedDBManager {
    private readonly dbName: string;
    private readonly version: number;
    private static dbInstance: IDBDatabase | null = null;

    constructor(dbName: string, version: number = 1) {
        this.dbName = dbName;
        this.version = version;
    }

    async getDB(): Promise<IDBDatabase> {
        if (IndexedDBManager.dbInstance) {
            return IndexedDBManager.dbInstance;
        }

        const request = indexedDB.open(this.dbName, this.version);

        return new Promise((resolve, reject) => {
            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                }

                if (!db.objectStoreNames.contains('loggedUser')) {
                    db.createObjectStore('loggedUser');
                }

                if (!db.objectStoreNames.contains('folders')) {
                    const folderStore = db.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
                    folderStore.createIndex('userId', 'userId', { unique: false });
                }
            };

            request.onsuccess = () => {
                IndexedDBManager.dbInstance = request.result;
                resolve(IndexedDBManager.dbInstance);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }
}
