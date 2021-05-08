import dotenv from 'dotenv';
dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 5000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@covegg19.we7sa.mongodb.net/Covegg19?retryWrites=true&w=majority`;
const MONGO = {
  url: connectionString,
  opt: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
};

const GOOGLE = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

const SESSION = {
  sessionSecret: `${process.env.SESSION_SECRET}`
};

const callbackUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://covegg19.com'
    : 'http://localhost:5000';

const redirectUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://covegg19.com'
    : 'http://localhost:3000';

const config = {
  server: SERVER,
  mongo: MONGO,
  google: GOOGLE,
  session: SESSION,
  callbackUrl,
  redirectUrl
};

export default config;
