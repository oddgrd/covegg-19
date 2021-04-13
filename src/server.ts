import http from 'http';
import express from 'express';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import User from './models/User';
import logging from './config/logging';
import config from './config/config';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import problemRoutes from './routes/problem';
import mongoSanitize from 'express-mongo-sanitize';
import cookieSession from 'cookie-session';

const NAMESPACE = 'Server';
const app = express();

// Configure passport
passport.use(
  new Strategy(
    {
      clientID: config.google.clientID as string,
      clientSecret: config.google.clientSecret as string,
      callbackURL: 'http://localhost:5000/api/auth/google/callback'
    },
    async (_accessToken, _refreshToken, profile: any, done) => {
      const user = await User.findOne({ googleId: profile.id });

      if (user) {
        done(null, user);
      } else {
        try {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
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

app.use(
  cookieSession({
    name: 'session',
    secret: config.cookie.cookieKey,
    maxAge: 30000
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoDB
mongoose
  .connect(config.mongo.url, config.mongo.opt)
  .then(() => {
    logging.info(NAMESPACE, 'Connected to MongoDB...');
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

// Logging the requests
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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);

// Error handling
app.use((_req, res, _next) => {
  const error = new Error('Not found');
  res.status(404).json({ message: error.message });
});

// Create the server
const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running on ${config.server.hostname}:${config.server.port}`
  )
);
