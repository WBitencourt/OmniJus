import 'dotenv/config'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..' , 'temp', 'uploads', )))

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!');
})