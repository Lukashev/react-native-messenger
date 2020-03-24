import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer'

import { verifyToken } from '../utils';

import Profile from '../models/Profile';
import { uploadImage } from '../utils/Storage';

const router = express.Router();
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/update', verifyToken, async (req, res, next) => {
  let { body } = req
  const _id = body._id
  delete body._id
  try {
    const profile = await Profile.findByIdAndUpdate(_id, { $set: body }, { new: true })
    if (!profile) return res.status(400).send('User not found')
    res.status(200).send({ result: profile, message: 'Your profile has been updated successfully' })
  } catch (e) {
    next(error)
  }
})

router.post('/avatar-upload', [
  verifyToken,
  multerMid.single('photo')
], async (req, res, next) => {
  const { profileId } = req.body
  try {
    const myFile = req.file
    const profile = await Profile.findById(profileId)
    if (!profile) throw new Error('Profile not found')

    const publicUrl = await uploadImage(myFile, { 
      uniqId: profileId
    })
    const update = await Profile.updateOne({ _id: profileId }, { avatar: publicUrl })
    if (update.n) {
      res
        .status(200)
        .json({
          message: "Upload was successful",
          publicUrl
        })
    } else {
      throw new Error('Upload error...')
    }
  } catch (e) {
    next(e)
  }
})

router.use((err, _req, res, next) => {
  res.status(500).send({
    result: null,
    message: err.message,
  })
  next()
})

export default router;