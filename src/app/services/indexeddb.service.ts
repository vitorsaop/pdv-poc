import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})

export class IndexedDBService {
  private db: IDBPDatabase | null = null;
  private readonly DB_NAME = 'PDVDB';
  private readonly DB_VERSION = 1;

  constructor() {
    this.inicializarDB();
  }

  private async inicializarDB() {
    this.db = await openDB(this.DB_NAME, this.DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('produtos')) {
          db.createObjectStore('produtos', { keyPath: 'codigoBarras' });
        }
        if (!db.objectStoreNames.contains('vendas')) {
          db.createObjectStore('vendas', { keyPath: 'id', autoIncrement: true });
        }
      }
    });

    console.log("IndexedDB inicializado com sucesso!");
  }

  async getDB(): Promise<IDBPDatabase> {
    if (!this.db) {
      await this.inicializarDB();
    }
    return this.db!;
  }
}
