const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/create', async (req, res) => {
    try {
      const client = await pool.connect()
      await client.query('create table test_table (id integer, name text)');
      await client.query('insert into test_table values (1, \'hello database\')');
      res.send("Success");
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
