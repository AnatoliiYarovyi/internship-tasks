import { PgDatabase } from 'drizzle-orm-pg';
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';

import { Clients_Photos } from './Clients_Photos';

import { clients_albums } from '../../tables/client/clients_albums_table';
import { albums } from '../../tables/photographer/albumsTable';
import { clients } from '../../tables/client/clientsTable';

export class Clients_Albums {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------

  async getAlbumsClientById(id: number) {
    const data = await this.db
      .select(clients_albums)
      .fields({
        id: clients_albums.albumId,
        name: albums.albumName,
        location: albums.location,
        timestamp: albums.specifiedTimestamp,
      })
      .leftJoin(clients, eq(clients_albums.clientId, clients.clientId))
      .leftJoin(albums, eq(clients_albums.albumId, albums.albumId))
      .where(and(eq(clients.clientId, id)));
    return data;
  }

  /* queryAlbumsClient */
  async getAlbumsClient(phone: string) {
    const data = await this.db
      .select(clients_albums)
      .fields({
        id: clients_albums.albumId,
        name: albums.albumName,
        location: albums.location,
        timestamp: albums.specifiedTimestamp,
      })
      .leftJoin(clients, eq(clients_albums.clientId, clients.clientId))
      .leftJoin(albums, eq(clients_albums.albumId, albums.albumId))
      .where(and(eq(clients.phone, phone)));
    return data;
  }

  async getAlbumsAndPhotos(phone: string) {
    const clients_photos = new Clients_Photos(this.db);
    const photos = await clients_photos.getPhotosClient(phone);
    const albums = await this.getAlbumsClient(phone);

    const albumsWithCover = this.addCoverToAlbum(albums, photos);
    const sortPhotos = this.sortPhotos(photos);

    return { albumsWithCover, sortPhotos };
  }

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------

  // -----------------------------------
  //  ***** INSERT *****
  // -----------------------------------

  async writeClientsAlbums(clientId: number, albumId: number) {
    const data = await this.db
      .insert(clients_albums)
      .values({
        clientId,
        albumId,
      })
      .catch(error => console.log(error));
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

  private addCoverToAlbum(albums: any[], photos: any[]) {
    const albumWithCover = albums.reduce((acc, el) => {
      const photoIndex = photos.findIndex(photo => photo.albumId === el.id);
      if (photoIndex !== -1) {
        el.coverLink = photos[photoIndex].smallPhoto;
      } else {
        el.coverLink = null;
      }

      acc.push(el);

      return acc;
    }, []);

    return albumWithCover;
  }
}
