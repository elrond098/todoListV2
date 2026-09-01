import qr, { end } from './db.js';

export async function display() {
  let res;
  try {
    res = await qr('SELECT * FROM Containers');
    console.log('serv.js: Data had been taken', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to take all container', err.stack);
  } finally {
    // await end();
  }
  return res ? res.rows : null;
}

// display()

export async function addContainer(params) {
  let res;
  try {
    res = await qr('INSERT INTO Containers(countained_name) VALUES($1) RETURNING *', [params]);
    console.log('serv.js: Data had been inserted', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to insert container', err.stack);
  } finally {
    // await end();
  }
  return res ? res.rows : null;
}

// addContainer('Test'); 

// export async function deleteContainer(params) {
//   let res;
//   try {
//     res = await qr('DELETE FROM Containers WHERE id = $1 RETURNING *', [params]);
//     console.log('serv.js: Data had been deleted', res.rows);
//   } catch (err) {
//     console.error('serv.js: Failed to delete container', err.stack);
//   } finally {
//
//   }
//   return res ? res.rows : null;
// }
//

export async function deleteContainer(id) {
  try {
    console.log('serv.js: ID to delete:', id);

    const res = await qr(
      'DELETE FROM Containers WHERE id = $1 RETURNING *',
      [id]
    );

    console.log('serv.js: Data had been deleted:', res.rows);

    return res.rows;
  } catch (err) {
    console.error('serv.js: Failed to delete container');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);

    throw err;
  }
}
