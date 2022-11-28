import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genres'
import './db';
import './seedData'
import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenticate';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

//Users router
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/movies', authenticate, moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});