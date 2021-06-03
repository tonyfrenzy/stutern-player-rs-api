import client from '../database/dbconn.js';

export const createPlayer = async (req, res) => {
  const { name, position, clubname, avatar } = req.body;
  
  try {
    const playersQuery = "INSERT INTO players (name, position, clubname, avatar) VALUES ($1, $2, $3, $4)";
    const values = [name, position, clubname, avatar];
    
    const response = await client.query(playersQuery, values);

    if (response) {
      return res.status(201).json({ 
        status: 'success', 
        message: 'player created'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPlayers = async (req, res) => {
  try {
    const playersQuery = 'SELECT * FROM players ORDER BY id ASC';
    
    const response = await client.query(playersQuery);

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: 'players retrieved',
        data: response.rowCount ? response.rows : '0 players found'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPlayer = async (req, res) => {
  const { id } = req.params;
  try {
    // Method 1:
    const playerQuery = 'SELECT * FROM players WHERE id=$1';
    const playerId = [id];    
    const response = await client.query(playerQuery, playerId);
   
    /**
    // Method 2:
    const playerQuery = `SELECT * FROM players WHERE id=${id}`;
    const response = await client.query(playerQuery);
    */

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: response.rowCount ? 'player retrieved' : 'player not found',
        data: response.rows[0]
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updatePlayer = async (req, res) => {  
  const { name, position, clubname, avatar } = req.body;

  const { id } = req.params;
  try {
    const playerUpdateQuery = "UPDATE players SET name=$1, position=$2, clubname=$3, avatar=$4 WHERE id=$5";    
    
    const playerData = [name, position, clubname, avatar, id];

    const response = await client.query(playerUpdateQuery, playerData);

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: response.rowCount ? 'player updated' : 'player not found'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deletePlayer = async (req, res) => { 
  const { id } = req.params;
  try {
    const playersQuery = `DELETE FROM players WHERE id=${id}`;
    
    const response = await client.query(playersQuery);

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: response.rowCount ? 'player deleted' : 'player not found'
      });
    }
  } catch (err) {
    console.log(err);
  }
};