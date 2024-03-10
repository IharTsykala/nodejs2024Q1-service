import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UpdatePasswordDto } from '../users/dto/update-user.dto';
import { Artist } from '../artists/entities/artist.entity';
import { CreateArtistDto } from '../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../artists/dto/update-artist.dto';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { CreateAlbumDto } from '../albums/dto/create-album.dto';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateAlbumDto } from '../albums/dto/update-album.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class Database {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  favorites: Favorite = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [], // favorite tracks ids
  };

  create(
    entity: string,
    createDto:
      | CreateUserDto
      | CreateArtistDto
      | CreateAlbumDto
      | CreateTrackDto,
  ): User | Artist | Album | Track {
    const date = Date.now();
    let createdEntity;

    if (createDto instanceof CreateUserDto) {
      createdEntity = new User({
        id: uuidv4(),
        login: createDto.login,
        password: createDto.password,
        version: 1,
        createdAt: date,
        updatedAt: date,
      });
    }

    if (createDto instanceof CreateArtistDto) {
      createdEntity = {
        id: uuidv4(),
        name: createDto.name,
        grammy: createDto.grammy ?? false,
      } as Artist;
    }

    if (createDto instanceof CreateAlbumDto) {
      createdEntity = {
        id: uuidv4(),
        name: createDto.name,
        year: createDto.year,
        artistId: createDto.artistId ?? null, // refers to Artist
      } as Album;
    }

    if (createDto instanceof CreateTrackDto) {
      createdEntity = {
        id: uuidv4(),
        name: createDto.name,
        artistId: createDto.artistId ?? null, // refers to Artist
        albumId: createDto.albumId ?? null, // refers to Album
        duration: createDto.duration, // integer number
      } as Track;
    }

    this[entity].push(createdEntity);
    return createdEntity;
  }

  findAll(entity: string): User[] | Artist[] | Album[] | Track[] {
    return this[entity];
  }

  findOne(entity: string, id: string): User | Artist | Album | Track {
    return this[entity].find((entity) => entity.id === id);
  }

  update(
    entity: User | Artist | Album | Track,
    updateEntityDto:
      | UpdatePasswordDto
      | UpdateArtistDto
      | UpdateAlbumDto
      | UpdateTrackDto,
  ) {
    if (
      updateEntityDto instanceof UpdatePasswordDto &&
      entity instanceof User
    ) {
      entity.password = updateEntityDto.newPassword;
      entity.version = entity.version + 1;
      entity.updatedAt = Date.now();
    } else {
      for (const key in updateEntityDto) {
        entity[key] = updateEntityDto[key];
      }
    }

    return entity;
  }

  removeEntityIdById(entity: string, id) {
    const entityItem = this[`${entity}s`].find(
      (entityItem) =>
        entityItem[`artistId`] === id || entityItem[`albumId`] === id,
    );

    if (entityItem && entityItem[`artistId`] === id) {
      entityItem[`artistId`] = null;
    }

    if (entityItem && entityItem[`albumId`] === id) {
      entityItem[`albumId`] = null;
    }
  }

  remove(entity: string, id: string): boolean {
    const indexRemovedEntity = this[entity].findIndex(
      (entity) => entity.id === id,
    );

    if (indexRemovedEntity !== -1) {
      this[entity].splice(indexRemovedEntity, 1);
      ['album', 'track'].forEach((entity) =>
        this.removeEntityIdById(entity, id),
      );
      return true;
    }

    return false;
  }

  getAllFavorites() {
    const body = {};

    for (const entityCollectionName in this.favorites) {
      body[entityCollectionName] = this.favorites[entityCollectionName]
        .map((entityId) =>
          this[entityCollectionName].find(
            (itemCollection) => itemCollection.id === entityId,
          ),
        )
        .filter((entity) => entity);
    }

    return body;
  }

  getFavorites(entity: string) {
    return this.favorites[entity].map((entityId) =>
      this[entity].find((itemCollection) => itemCollection.id === entityId),
    );
  }

  addFavorites(entity: string, id: string) {
    this.favorites[entity].push(id);
    return true;
  }

  removeFavorites(entity: string, id: string) {
    const indexRemovedEntity = this.favorites[entity].findIndex(
      (entity) => entity.id === id,
    );
    if (indexRemovedEntity) {
      this.favorites[entity].splice(indexRemovedEntity, 1);
      return true;
    }
  }
}
