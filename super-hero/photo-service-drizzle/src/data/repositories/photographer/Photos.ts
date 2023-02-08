import { PgDatabase } from 'drizzle-orm-pg';
import { and, eq } from 'drizzle-orm/expressions';

import { photos } from '../../tables/photographer/photosTable';
import { albums } from '../../tables/photographer/albumsTable';
import { photographers } from '../../tables/photographer/photographersTable';

export class Photos {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------
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

  async getPhotosByAlbumId(nickname: string, albumId: number) {
    const data = await this.db
      .select(photos)
      .fields({
        photoId: photos.photoId,
        smallPhotoLink: photos.smallPhotoLink,
        photoLink: photos.photoLink,
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
  async writeNewPhoto(name: string, photoLink: string, albumId: number) {
    const data = await this.db.insert(photos).values({
      name,
      photoLink,
      albumId,
    });
    return data;
  }
}
