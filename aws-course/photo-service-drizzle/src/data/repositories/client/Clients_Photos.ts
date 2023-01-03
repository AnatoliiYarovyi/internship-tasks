import { PgDatabase } from 'drizzle-orm-pg';
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';

import { Clients } from './Clients';

import { clients } from '../../tables/client/clientsTable';
import { clients_photos } from '../../tables/client/clients_photos_table';
import { albums } from '../../tables/photographer/albumsTable';
import { photos } from '../../tables/photographer/photosTable';

export class Clients_Photos {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------
  async getPhotosClient(phone: string) {
    const data = await this.db
      .select(clients_photos)
      .fields({
        unlocked: clients_photos.unlocked,
        id: photos.photoId,
        name: photos.name,
        photo: photos.photoLink,
        smallPhoto: photos.smallPhotoLink,
        demoPhoto: photos.demoPhotoLink,
        smallDemoPhoto: photos.smallDemoPhotoLink,
        albumId: photos.albumId,
      })
      .leftJoin(clients, eq(clients_photos.clientId, clients.clientId))
      .leftJoin(photos, eq(clients_photos.photoId, photos.photoId))
      .leftJoin(albums, eq(photos.albumId, albums.albumId))
      .where(and(eq(clients.phone, phone), eq(photos.loaded, true)));

    return data;
  }

  async getPhotosByAlbumId(phone: string, albumId: number) {
    const data = await this.db
      .select(clients_photos)
      .fields({
        unlocked: clients_photos.unlocked,
        id: photos.photoId,
        name: photos.name,
        photo: photos.photoLink,
        smallPhoto: photos.smallPhotoLink,
        demoPhoto: photos.demoPhotoLink,
        smallDemoPhoto: photos.smallDemoPhotoLink,
        albumId: photos.albumId,
      })
      .leftJoin(clients, eq(clients_photos.clientId, clients.clientId))
      .leftJoin(photos, eq(clients_photos.photoId, photos.photoId))
      .leftJoin(albums, eq(photos.albumId, albums.albumId))
      .where(
        and(
          eq(clients.phone, phone),
          eq(albums.albumId, albumId),
          eq(photos.loaded, true),
        ),
      );

    const sortData = this.sortPhotos(data);

    return sortData;
  }

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------
  async updateUnlockedPhoto(albumId: number, nickname: string) {
    const clients = new Clients(this.db);
    const clientId = await clients.getCurrentClientId(nickname);

    const data = await this.db
      .update(clients_photos)
      .set({ unlocked: true })
      .where(
        and(
          eq(clients_photos.clientId, clientId),
          eq(clients_photos.albumId, albumId),
        ),
      );
    return data;
  }

  // -----------------------------------
  //  ***** INSERT *****
  // -----------------------------------
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

  // -----------------------------------
  // ***** OTHERS *****
  // -----------------------------------
  private sortPhotos(dataClientPhotos: any) {
    const sortData = dataClientPhotos.reduce(
      (
        acc,
        el: {
          unlocked: boolean;
          id: number;
          name: string;
          photo: string;
          smallPhoto: string;
          demoPhoto: string;
          smallDemoPhoto: string;
          albumId: number;
        },
      ) => {
        let photoData = {};
        if (el.unlocked) {
          photoData = {
            photoId: el.id,
            unlocked: el.unlocked,
            albumId: el.albumId,
            photoName: el.name,
            photoLink: el.photo,
            smallPhotoLink: el.smallPhoto,
          };
        } else {
          photoData = {
            photoId: el.id,
            unlocked: el.unlocked,
            albumId: el.albumId,
            photoName: el.name,
            photoLink: el.demoPhoto,
            smallPhotoLink: el.smallDemoPhoto,
          };
        }
        acc.push(photoData);

        return acc;
      },
      [],
    );

    return sortData;
  }
}
