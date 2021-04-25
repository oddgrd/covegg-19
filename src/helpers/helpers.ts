import { format } from 'util';
import storage from '../config/googleCloud';

const bucket = storage.bucket('covegg-19-boards');

export const uploadImage = (file: Express.Multer.File) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, '_'));
    const blobStream = blob.createWriteStream({
      resumable: false
    });
    blobStream
      .on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on('error', () => {
        reject('Unable to upload image');
      })
      .end(buffer);
  });
