import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';
import mongoSanitize from 'express-mongo-sanitize';

const NAMESPACE = 'Server';
const app = express();

// Logging the request
app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

// Express built-in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rules of API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    res.status(200).json({});
  }
  next();
});

// Middleware to sanitize user input
app.use(
  mongoSanitize({
    replaceWith: '_'
  })
);

// Routes
app.use('/sample', sampleRoutes);
// app.use('/api/auth', require('./routes/api/auth'));

// Error handling
app.use((_req, res, next) => {
  const error = new Error('Not found');
  return res.status(404).json({ message: error.message });
  next();
});

// Create the server
const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
