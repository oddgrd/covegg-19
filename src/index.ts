import express from 'express';
// import { connectDB } from '../config/db';
import mongoSanitize from 'express-mongo-sanitize';
const app: express.Application = express();

// Connect to mongoDB
// connectDB();

// Express built-in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to sanitize user input
app.use(
  mongoSanitize({
    replaceWith: '_'
  })
);

// app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
