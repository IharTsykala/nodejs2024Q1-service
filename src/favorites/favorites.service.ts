import { Injectable } from '@nestjs/common';
import Database from '../bd';

@Injectable()
export class FavoritesService {
  constructor(private storage: Database) {}

  getAll() {
    return this.storage.getAllFavorites();
  }

  get(entity: string) {
    return this.storage.getFavorites(entity);
  }

  add(entity: string, id: string) {
    return this.storage.addFavorites(entity, id);
  }

  remove(entity: string, id: string) {
    return this.storage.removeFavorites(entity, id);
  }
}
