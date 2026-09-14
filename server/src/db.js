import pg from 'pg';

const { Pool} = pg;

const pool = new Pool({
  user: 'learndb',
  host: 'localhost',
  database: 'learndb',
  password: 'sahal1234',
  prot: 5432
})

const query = (text, params = []) => pool.query(text, params);
export const endDatabaseConnection = () => pool.end();

export default query;
