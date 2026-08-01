import pg from 'pg';

const { Pool} = pg;

const pool = new Pool({
  user: 'learndb',
  host: 'localhost',
  database: 'learndb',
  password: '',
  prot: 5432
})

const query = (text, params = []) => pool.query(text, params);
export const end = () => pool.end();

export default query;
