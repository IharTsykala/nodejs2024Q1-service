import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

const storages = {
  tracks: 'tracksStorage',
  albums: 'albumsStorage',
  artists: 'artistsStorage',
};

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsStorage: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsStorage: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksStorage: TracksService,
    @InjectRepository(Favorite)
    private readonly favoritesStorage: Repository<Favorite>,
  ) {}

  async getAll() {
    const favorites = { artists: [], albums: [], tracks: [] };
    const allFavorites = await this.favoritesStorage.find();
    for (const entityName in storages) {
      favorites[entityName] = (
        await Promise.all(
          allFavorites
            .filter(({ entity }) => entity === entityName)
            .map(async ({ entityId, entity }) => {
              return await this[storages[entity]].findOne(entityId);
            }),
        )
      ).filter(Boolean);
    }

    return favorites;
  }

  async get(entity: string) {
    const [favorites] = await this.favoritesStorage.find({
      relations: {
        [entity]: true,
      },
    });

    return favorites;
  }

  async add(entity: string, id: string) {
    return await this.favoritesStorage.save({ entityId: id, entity });
  }

  async remove(entity: string, id: string) {
    return await this.favoritesStorage.delete({ entityId: id, entity });
  }
}
