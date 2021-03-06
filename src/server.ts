import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Strategy } from 'passport-google-oauth20';
import User from './models/User';
import logging from './config/logging';
import config from './config/config';
import authRoutes from './routes/api/auth';
import boardRoutes from './routes/api/board';
import problemRoutes from './routes/api/problem';
import mongoSanitize from 'express-mongo-sanitize';
import lusca from 'lusca';
import multer from 'multer';
import path from 'path';

const NAMESPACE = 'Server';
const app = express();

// Connect mongoDB
mongoose
  .connect(config.mongo.url, config.mongo.opt)
  .then(() => {
    logging.info(NAMESPACE, 'Connected to MongoDB...');
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

// Configure passport
passport.use(
  new Strategy(
    {
      clientID: config.google.clientID as string,
      clientSecret: config.google.clientSecret as string,
      callbackURL: `${config.callbackUrl}/api/auth/google/callback`
    },
    async (_accessToken, _refreshToken, profile: any, done) => {
      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        { $set: { avatar: profile._json.picture } },
        { new: true }
      );
      if (user) {
        done(null, user);
      } else {
        try {
          const newUser = new User({
            name: profile.displayName,
            email: profile._json.email,
            avatar: profile._json.picture,
            googleId: profile.id
          });
          await newUser.save();
          done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Configure express-session with mongoDB store
app.use(
  session({
    secret: config.session.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5184000000,
      sameSite: 'lax'
    },
    store: MongoStore.create({
      mongoUrl: config.mongo.url,
      stringify: false,
      autoRemove: 'native'
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Configure multer
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
app.use(multerMid.single('file'));

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(
  mongoSanitize({
    replaceWith: '_'
  })
);

// Log requests
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

// Rules of API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    res.status(200).json({});
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/problems', problemRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
  });
}

// Error handling
app.use((_req, res, _next) => {
  const error = new Error('Not found');
  res.send(error);
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running on ${config.server.hostname}:${config.server.port}`
  )
);
