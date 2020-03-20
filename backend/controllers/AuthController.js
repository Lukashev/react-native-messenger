import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../config';
import { verifyToken, sendActivationCode, sendRecoveryLink } from '../utils';

import User from '../models/User';
import Profile from '../models/Profile';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ token: null, message: 'User not found' });
    if (!user.isActivated) return res.status(400).send({ 
      token: null, 
      message: 'Account is not activated',
      needActivation: true
    });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(400).send({ token: null, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: rememberMe ? 86400 * 30 : 86400
    });

    res.status(200).send({ token, message: null });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/signup', async (req, res) => {
  const { password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ result: null, message: 'Such user already exists' });

    const newUser = await User.create({ email, password: hashedPassword });
    await Profile.create({ user: newUser._id });

    await sendActivationCode(newUser);

    return res.status(200).send({ result: true, message: 'You are successfully registered. Check your mail' });
  } catch (e) {
    res.status(500).send({ result: null, message: e.message });
  }
});

router.post('/account_activation', async (req, res) => {
  const { email, activationCode } = req.body
  console.log(email, activationCode)
  try {
    const user = await User.findOneAndUpdate({
      email,
      activationCode
    }, { isActivated: true })
    console.log(user)
    if (!user) return res.status(400).send({ result: null, message: 'Invalid activation code' })
    if (user.isActivated) return res.status(200).send({ result: true, message: 'This account is already activated' })
    return res.status(200).send({ result: true, message: 'You have successfully activated your account' })
  } catch (e) {
    res.status(500).send({ result: null, message: e.message })
  }
})

router.get('/account_activation', async (req, res) => {
  const { email } = req.query
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send({ result: null, message: 'User not found' })
    await sendActivationCode(user)
    return res.status(200).send({ result: true, message: 'Activation code sent to your mail' })
  } catch (e) {
    res.status(500).send({ result: null, message: e.message })
  }
})

router.post('/get_recovery_link', async(req, res) => {
  const { email, appURL } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send({ result: null, message: 'User not found' })
    await sendRecoveryLink(user, appURL)
    return res.status(200).send({ result: true, message: 'Please, check your mail' })
  } catch (e) {
    res.status(500).send({ result: null, message: e.message })
  }
})

router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId }).populate('user');
    if (!profile) return res.status(400).send({ result: null, message: 'User not found' });
    const { user: { name, email } } = profile;
    return res.status(200).send({ result: profile, message: `Welcome, ${name || email}!` });
  } catch (e) {
    res.status(500).send({ result: null, message: e.message });
  }
});

export default router;
