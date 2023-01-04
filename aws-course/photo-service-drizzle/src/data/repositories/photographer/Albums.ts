import { PgDatabase } from 'drizzle-orm-pg';
import { and, eq } from 'drizzle-orm/expressions';

import { Photographers } from './Photographers';

import { albums } from '../../tables/photographer/albumsTable';
import { photographers } from '../../tables/photographer/photographersTable';
import { photos } from '../../tables/photographer/photosTable';

export class Albums {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------

  async getAlbumId(
    nickname: string,
    albumName: string,
    specifiedTimestamp: string | number,
  ) {
    const photographer = new Photographers(this.db);
    const photographerId = await photographer.getCurrentPhtographerId(nickname);
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
        albumName: albums.albumName,
        location: albums.location,
        specifiedTimestamp: albums.specifiedTimestamp,
        albumCoverLink: albums.albumCoverLink,
      });
    return data;
  }

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

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------
  async updateAlbumCoverLink(albumId: number, dataSmallPhoto: string) {
    const data = await this.db
      .update(albums)
      .set({ albumCoverLink: dataSmallPhoto })
      .where(eq(albums.albumId, albumId));
    return data;
  }

  // -----------------------------------
  //  ***** INSERT *****
  // -----------------------------------
  async writeNewAlbum(
    nickname: string,
    albumName: string,
    location: string,
    specifiedTimestamp: number | string,
  ) {
    const photographer = new Photographers(this.db);
    const photographerId = await photographer.getCurrentPhtographerId(nickname);

    const data = await this.db.insert(albums).values({
      albumName,
      location,
      specifiedTimestamp: +specifiedTimestamp,
      photographerId,
    });
    return data;
  }
}
