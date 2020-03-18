import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
