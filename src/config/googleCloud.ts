import { Storage } from '@google-cloud/storage';

const creds = process.env['GOOGLE_CREDENTIALS'] as string;
const keys = JSON.parse(creds);
const storage = new Storage({
  projectId: 'covegg19',
  credentials: keys
});

export default storage;
