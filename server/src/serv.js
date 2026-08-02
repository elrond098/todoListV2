import qr, { end } from './db.js';

async function display() {
  console.log('Get data from database');
}

export async function addContainer(params) {
  let res;
  try {
  res = await qr('INSERT INTO Containers(countained_name) VALUES($1) RETURNING *',[params]);
  console.log('serv.js: Data had been inserted', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to insert container', err.stack);
  } finally { 
    // await end();
  }
  return res ? res.rows : null;
}

// addContainer('Test');
