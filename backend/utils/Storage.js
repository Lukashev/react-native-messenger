import { Storage } from '@google-cloud/storage'
import util from 'util'
import path from 'path'

const serviceKey = path.join(__dirname, '../service-account.json')

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'messenger-271915',
})

const bucket = storage.bucket('messenger-bucket')

export const uploadImage = (file, { uniqId }) => new Promise(async (resolve, reject) => {
  try {
    const { originalname, buffer } = file

    const unixTimestamp = new Date().getTime() * 1000,
      filename = `${unixTimestamp}-${uniqId}`,
      extension = originalname.split('.')[1]

    const blob = bucket.file(`${filename}.${extension}`)
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    blobStream.on('finish', () => {
      const publicUrl = util.format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
      .on('error', () => {
        reject(`Unable to upload image, something went wrong`)
      })
      .end(buffer)
  } catch (e) {
    throw new Error(e.message)
  }
})