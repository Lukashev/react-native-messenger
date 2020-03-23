import express from 'express';
import bodyParser from 'body-parser';

import config from '../config';
import { verifyToken } from '../utils';

import Profile from '../models/Profile';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/update', verifyToken, async (req, res) => {
  let { body } = req
  const _id = body._id
  delete body._id
  try {
    const profile = await Profile.findByIdAndUpdate(_id, { $set: body }, { new: true })
    if (!profile) return res.status(400).send('User not found')
    res.status(200).send({ result: profile, message: 'Your profile has been updated successfully' })
  } catch(e) {
    res.status(500).send(e.message);
  } 
})

export default router;