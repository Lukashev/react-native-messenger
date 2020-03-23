import express from 'express';
import AuthController from './controllers/AuthController';
import ProfileController from './controllers/ProfileController';
import './db';

const app = express();

app.get('/api', (req, res) => {
  res.status(200).send('API works.');
});

app.get('/password_recovery', (req, res) => {
  const { appURL, recoveryHash } = req.query;
  return res.redirect(`${appURL}?recoveryHash=${recoveryHash}`);
});

app.use('/api/auth', AuthController);
app.use('/api/profile', ProfileController)

export default app;
