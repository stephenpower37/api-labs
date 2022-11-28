import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genres'
import './db';
import './seedData'
import usersRouter from './api/users';
import session from 'express-session';
import passport from './authenticate';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

//session middleware
app.use(passport.initialize());

//Users router
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});