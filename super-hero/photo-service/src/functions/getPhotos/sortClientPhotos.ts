const sortClientPhotos = (dataClientPhotos: any) => {
  const sortData = dataClientPhotos.reduce((acc, el) => {
    let photoData = {};
    if (el.unlockedPhoto) {
      photoData = {
        photoId: el.photoId,
        unlocked: el.unlockedPhoto,
        albumName: el.albumName,
        photoName: el.photoName,
        photoLink: el.photoLink,
        smallPhotoLink: el.smallPhotoLink,
      };
    } else {
      photoData = {
        photoId: el.photoId,
        unlocked: el.unlockedPhoto,
        albumName: el.albumName,
        photoName: el.photoName,
        photoLink: el.demoPhotoLink,
        smallPhotoLink: el.smallDemoPhotoLink,
      };
    }
    acc.push(photoData);

    return acc;
  }, []);

  return sortData;
};

export default sortClientPhotos;
