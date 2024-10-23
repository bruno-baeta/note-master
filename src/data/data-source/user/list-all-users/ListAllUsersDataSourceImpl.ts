import { ListAllUsersDataSource } from './ListAllUsersDataSource';
import { User } from '../../../../domain/models/User';
import {IndexedDBManager} from "../../../IndexedDBManager";

const STORE_NAME = 'users';
const DATABASE_NAME = 'notemaster';

export class ListAllUsersDataSourceImpl implements ListAllUsersDataSource {
  private dbManager: IndexedDBManager;

  constructor() {
    this.dbManager = new IndexedDBManager(DATABASE_NAME);
  }

  async handle(): Promise<User[]> {
    const db = await this.dbManager.getDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        transaction.oncomplete = () => resolve(request.result as User[]);
      };
      request.onerror = () => reject(request.error);
    });
  }
}
