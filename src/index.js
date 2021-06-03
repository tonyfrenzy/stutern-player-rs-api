import express from 'express';
import cors from 'cors';
import pool from './database/dbconn.js';
import { migrateTables } from './database/migrations.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

pool.connect();

// create
app.post('/migrations', migrateTables);

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});