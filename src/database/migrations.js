import pool from './dbconn.js';

export const migrateTables = async (req, res) => {
  try {      
    const tableQueries = `
      CREATE TABLE IF NOT EXISTS players ( 
          id SERIAL PRIMARY KEY, 
          name VARCHAR(100),
          position INT,
          clubname VARCHAR(100), 
          avatar TEXT
          );
      `;
      
    const response = await pool.query(tableQueries);
    console.log('Tables migrated successfully.' );

    if (response) {
      return res.status(201).json({ 
        status: 'success', 
        // data: response, 
        message: 'Tables migrated successfully.' 
      });
    }
  } catch (err) {
    console.log(err);
  }
};