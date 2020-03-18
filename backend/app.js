import express from 'express';
import AuthController from './controllers/AuthController';
import './db';

const app = express();

app.get('/api', (req, res) => {
  res.status(200).send('API works.');
});

app.use('/api/auth', AuthController);

export default app;
