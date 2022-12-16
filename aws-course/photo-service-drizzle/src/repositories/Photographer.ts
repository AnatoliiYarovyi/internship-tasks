import { PgDatabase } from 'drizzle-orm-pg';
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';

import {
  selfies,
  clients,
  clients_photos,
  photos,
  albums,
  photographers,
} from '../data/schema';

export class Photographer {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------

  /* queryPhotographersData */
  async getAllPhotographers() {
    const data = await this.db.select(photographers).fields({
      id: photographers.photographerId,
      nickname: photographers.nickname,
      fullName: photographers.fullName,
      email: photographers.email,
    });
    return data;
  }

  /* queryCurrentPhtographerId */
  async getCurrentPhtographerId(nickname: string) {
    const data = await this.db
      .select(photographers)
      .where(eq(photographers.nickname, nickname))
      .fields({
        id: photographers.photographerId,
      });

    const { id } = data[0];
    return id;
  }

  async getAlbumId(
    nickname: string,
    albumName: string,
    specifiedTimestamp: string | number,
  ) {
    const photographerId = await this.getCurrentPhtographerId(nickname);
    const data = await this.db
      .select(albums)
      .fields({
        id: albums.albumId,
      })
      .where(
        and(
          eq(albums.photographerId, photographerId),
          eq(albums.albumName, albumName),
          eq(albums.specifiedTimestamp, +specifiedTimestamp),
        ),
      );

    const { id } = data[0];
    return id;
  }

  /* queryAlbumsPhotographer */
  async getAlbums(nickname: string) {
    const data = await this.db
      .select(albums)
      .leftJoin(
        photographers,
        eq(albums.photographerId, photographers.photographerId),
      )
      .where(eq(photographers.nickname, nickname))
      .fields({
        albumId: albums.albumId,
        name: albums.albumName,
        location: albums.location,
        timestamp: albums.specifiedTimestamp,
        coverLink: albums.albumCoverLink,
      });
    return data;
  }

  /* queryAlbumsData */
  async getAlbumsData(photoId: number) {
    const data = await this.db
      .select(albums)
      .leftJoin(photos, eq(albums.albumId, photos.albumId))
      .where(eq(photos.photoId, photoId))
      .fields({
        albumId: albums.albumId,
        name: albums.albumName,
        coverLink: albums.albumCoverLink,
      });
    return data[0];
  }

  /* queryCurrentAlbumId */
  async getCurrentAlbumId(albumName: string) {
    const data = await this.db
      .select(albums)
      .where(eq(albums.albumName, albumName))
      .fields({
        id: albums.albumId,
      });

    const { id } = data[0];
    return id;
  }

  /* queryCurrentPhotoId */
  async getCurrentPhotoId(photoName: string) {
    const data = await this.db
      .select(photos)
      .where(eq(photos.name, photoName))
      .fields({
        id: photos.photoId,
      });

    const { id } = data[0];
    return id;
  }

  /* queryPhotosPhotographer */
  async getPhotosByAlbumId(nickname: string, albumId: number) {
    const data = await this.db
      .select(photos)
      .fields({
        id: photos.photoId,
        smallPhoto: photos.smallPhotoLink,
        photo: photos.photoLink,
        albumName: albums.albumName,
      })
      .leftJoin(albums, eq(photos.albumId, albums.albumId))
      .leftJoin(
        photographers,
        eq(albums.photographerId, photographers.photographerId),
      )
      .where(
        and(
          eq(albums.albumId, albumId),
          eq(photographers.nickname, nickname),
          eq(photos.loaded, true),
        ),
      );
    return data;
  }

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------

  /* updateAlbumData */
  async updateAlbumCoverLink(albumId: number, dataSmallPhoto: string) {
    const data = await this.db
      .update(albums)
      .set({ albumCoverLink: dataSmallPhoto })
      .where(eq(albums.albumId, albumId));
    return data;
  }

  /* updatePhotoLinks */
  async updatePhotoLinks(
    photoId: number,
    smallPhotoLink: string,
    demoPhotoLink: string,
    smallDemoPhotoLink: string,
  ) {
    const data = await this.db
      .update(photos)
      .set({ smallPhotoLink, demoPhotoLink, smallDemoPhotoLink })
      .where(eq(photos.photoId, photoId));
    return data;
  }

  /* updatePhotosLoaded */
  async updatePhotosLoaded(photoId: number) {
    const data = await this.db
      .update(photos)
      .set({ loaded: true })
      .where(eq(photos.photoId, photoId));
    return data;
  }

  // -----------------------------------
  //  ***** INSERT *****
  // -----------------------------------

  /* writePhotographerToDB */
  async writePhotographer(
    nickname: string,
    fullName?: string,
    email?: string,
    phone?: string,
  ) {
    const data = await this.db.insert(photographers).values({
      nickname,
      fullName,
      email,
      phone,
    });
    return data;
  }

  /* writeNewAlbum */
  async writeNewAlbum(
    nickname: string,
    albumName: string,
    location: string,
    specifiedTimestamp: number | string,
  ) {
    const photographerId = await this.getCurrentPhtographerId(nickname);

    const data = await this.db.insert(albums).values({
      albumName,
      location,
      specifiedTimestamp: +specifiedTimestamp,
      photographerId,
    });
    return data;
  }

  /* writeNewPhoto */
  async writeNewPhoto(name: string, photoLink: string, albumId: number) {
    const data = await this.db.insert(photos).values({
      name,
      photoLink,
      albumId,
    });
    return data;
  }

  /* writeClientPhoto */
  async writeClientPhotoById(
    clientId: number,
    photoId: number,
    albumId: number,
  ) {
    const data = await this.db.insert(clients_photos).values({
      clientId,
      photoId,
      albumId,
    });
    return data;
  }
}
