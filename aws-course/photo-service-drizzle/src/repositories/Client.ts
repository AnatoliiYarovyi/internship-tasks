import { sql } from 'drizzle-orm';
import { PgDatabase } from 'drizzle-orm-pg';
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';
import { Albums, Photos } from '../data/schema';

import {
  selfies,
  clients,
  clients_photos,
  photos,
  albums,
  photographers,
  clients_albums,
} from '../data/schema';

export class Client {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------

  /* queryCurrentClientId */
  async getCurrentClientId(phone: string) {
    const data = await this.db
      .select(clients)
      .where(eq(clients.phone, phone))
      .fields({
        id: clients.clientId,
      });
    const { id } = data[0];
    return id;
  }

  /* queryPhotosClient */
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

    // const sortData = this.sortPhotos(data);

    // return sortData;
    return data;
  }

  /* queryPhotosClientByAlbum */
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

  // /* queryAlbumsClient */
  // async getAlbumsClient(phone: string) {
  //   const data = await this.db.execute(
  //     sql`SELECT a.album_id, a.album_name, a.location, a.specified_timestamp, a.album_cover_link
  //     FROM clients_photos AS cp
  //     JOIN clients AS c ON cp.client_id = c.client_id
  //     JOIN photos AS p ON cp.photo_id = p.photo_id
  //     JOIN albums AS a ON p.album_id = a.album_id
  //     WHERE c.phone = ${phone}
  //     GROUP BY a.album_id;`,
  //   );

  //   const sortData = this.sortAlbum(data['rows']);
  //   return sortData;
  // }

  /* queryAlbumsClient */
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

  async getAlbumsAndClients(phone: string) {
    const albums = await this.getAlbumsClient(phone);
    const photos = await this.getPhotosClient(phone);
    console.log(photos);

    const albumsWithCover = await this.addCoverToAlbum(albums, photos);
    const sortPhotos = this.sortPhotos(photos);

    return { albumsWithCover, sortPhotos };
  }

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------

  /* updateClientsData */
  async updateClientsData(phone: string, fullName?: string, email?: string) {
    const data = await this.db
      .update(clients)
      .set({ fullName, email })
      .where(eq(clients.phone, phone));
    return data;
  }

  /* updateSelfiesLoaded */
  async updateSelfiesLoaded(selfiName: string) {
    const data = await this.db
      .update(selfies)
      .set({ loaded: true })
      .where(eq(selfies.name, selfiName));
    return data;
  }

  /* updateUnlockedPhoto */
  async updateUnlockedPhoto(albumId: number, nickname: string) {
    const clientId = await this.getCurrentClientId(nickname);

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

  /* writeClientsToDB */
  async writeClients(phone: string) {
    const data = await this.db.insert(clients).values({
      phone,
    });
    return data;
  }

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

  /* writeClientsSelfieLink */
  async writeClientsSelfieLink(
    nickname: string,
    name: string,
    selfieLink: string,
  ) {
    const clientId = await this.getCurrentClientId(nickname);

    const data = await this.db.insert(selfies).values({
      name,
      selfieLink,
      clientId,
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

  async addCoverToAlbum(albums: any[], photos: any[]) {
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

  private sortAlbum(arrAlbum) {
    const sortData = arrAlbum.reduce(
      (
        acc,
        el: {
          album_id: number;
          album_name: string;
          location: string;
          specified_timestamp: string;
          album_cover_link: string;
        },
      ) => {
        acc.push({
          albumId: el.album_id,
          albumName: el.album_name,
          location: el.location,
          specifiedTimestamp: el.specified_timestamp,
          albumCoverLink: el.album_cover_link,
        });
        return acc;
      },
      [],
    );

    return sortData;
  }
}
