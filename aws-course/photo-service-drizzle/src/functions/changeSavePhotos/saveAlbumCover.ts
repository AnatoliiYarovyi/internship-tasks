import { Photographer } from '../../repositories/Photographer';

const saveAlbumCover = async (
  photographer: Photographer,
  photoId: number,
  smallPhotoLink: string,
) => {
  const getAlbumData = await photographer.getAlbumsData(photoId);

  const { albumId, coverLink } = getAlbumData;
  if (coverLink) {
    return console.log('album cover was not saved');
  } else {
    await photographer.updateAlbumCoverLink(albumId, smallPhotoLink);
  }
  return;
};

export default saveAlbumCover;
