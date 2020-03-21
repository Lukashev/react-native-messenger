import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';
import os from 'os';
import sendMail from '../nodemailer';
import config from '../config';
import User from '../models/User';

export const getIPAddress = () => {
  const ifs = os.networkInterfaces();
  return Object.keys(ifs)
    .map((x) => ifs[x].filter((x) => x.family === 'IPv4' && !x.internal)[0]) // eslint-disable-line no-shadow
    .filter((x) => x)[0].address;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) { return res.status(403).send({ result: null, message: 'No token provided' }); }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) { return res.status(500).send({ result: null, message: 'Failed to authenticate token' }); }

    req.userId = decoded.id;
    next();
  });
};

export const sendActivationCode = async (user) => {
  const activationCode = cryptoRandomString({ length: 6, type: 'numeric' });
  await User.findByIdAndUpdate(user._id, { activationCode });
  await sendMail(user.email, {
    subject: 'Messenger: Account Activation',
    html: `Your activation code: ${activationCode}`
  });
};

export const sendRecoveryLink = async (user, appURL, serverURL) => {
  const recoveryHash = cryptoRandomString({ length: 12, type: 'url-safe' });
  await User.findByIdAndUpdate(user._id, { recoveryHash });
  const link = `${serverURL}/password_recovery?recoveryHash=${recoveryHash}&appURL=${appURL}`;
  await sendMail(user.email, {
    subject: 'Messenger: Password Recovery',
    html: `<a href="${link}"><span>Follow this link</span></a>`,
  });
};
