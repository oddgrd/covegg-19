import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;

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
const config = {
  server: SERVER,
  mongo: MONGO
};

export default config;
