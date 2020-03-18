import 'dotenv/config';

const {
  DB_URI,
  JWT_SECRET,
  GMAIL_USER,
  GMAIL_PASSWORD
} = process.env;

export default {
  DB_URI,
  JWT_SECRET,
  GMAIL_USER,
  GMAIL_PASSWORD
};
