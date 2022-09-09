import express from 'express';
import { createServer  } from 'http';
import cors from 'cors';
import path from 'path';

import { router } from './router';
import createConnection from './database';

createConnection()
    .then(async () => {
        console.log('Connected to database.')
    }).catch(err => console.log(err));

const app = express();
const http = createServer(app);

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/uplouds', express.static(path.join(__dirname, '..', 'uplouds')));

export { http , app };