import qr, { end } from './db.js';
//
// Containers Area ===================================================================================
//
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

export async function deleteContainer(params) {
  let res;
  try {
    res = await qr('DELETE FROM Containers WHERE id = $1 RETURNING *', [params]);
    console.log('serv.js: Data had been deleted', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to delete container', err.stack);
    return res ? res.rows : null;
  }
}
//
// TodoList Area ==========================================================================================
//
export async function displayTodoList(params) {
  let res;
  try {
    res = await qr('SELECT * FROM todolist WHERE countainer_id = $1', [params]);
    console.log('serv.js: Data had been taken', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to take all TodoList', err.stack);
  } finally {
    // await end();
  }
  return res ? res.rows : null;
}

export async function addTodoList(params1, params2) {
  let res;
  try {
    res = await qr('INSERT INTO todolist(countainer_id, title) VALUES($1, $2) RETURNING *', [params1, params2]);
    console.log('serv.js: TodoList had Been Added', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to Add TodoList', err.stack);
  }
  return res ? res.rows : null;
}

export async function deleteTodoList(params) {
  let res;
  try {
    res = await qr('DELETE FROM todolist WHERE id = $1 RETURNING *', [params]);
    console.log('serv.js: Data had been deleted', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to delete todolist', err.stack);
    return res ? res.rows : null;
  }
}
