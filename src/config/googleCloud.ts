import { Storage } from '@google-cloud/storage';
import path from 'path';

const serviceKey = path.join(__dirname, './default.json');

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'covegg19'
});

export default storage;
