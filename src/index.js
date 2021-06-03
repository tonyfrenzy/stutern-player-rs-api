import express from 'express';
import cors from 'cors';
import pool from './database/dbconn.js';
import { migrateTables } from './database/migrations.js';
import { createPlayer, getPlayers, getPlayer, updatePlayer, deletePlayer } from './database/queries.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

pool.connect();

// create
app.post('/migrations', migrateTables);
app.post('/players', createPlayer);

// read
app.get('/players', getPlayers);
app.get('/players/:id', getPlayer);

// update
// app.patch('/players/:id', updatePlayer);
app.put('/players/:id', updatePlayer);

// delete
app.delete('/players/:id', deletePlayer);

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});