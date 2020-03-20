import nodemailer from 'nodemailer';
import config from '../config';

const {
  GMAIL_USER: user,
  GMAIL_PASSWORD: pass
} = config;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: { user, pass }
});

const sendMail = async (recipient, { subject, html }) => {
  const mailOptions = {
    from: user,
    to: recipient,
    subject,
    html
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err.message);
  }
};

export default sendMail;
