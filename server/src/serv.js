import qr, { endDatabaseConnection } from './db.js';
//
// Containers Area ===================================================================================
//
export async function getAllContainers() {
  let res;
  try {
    res = await qr('SELECT * FROM containers ORDER BY id ASC');
    console.log('serv.js: Data had been taken', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to take all container', err.stack);
  } finally {
    // await end();
  }
  return res ? res.rows : null;
}

export async function addContainer(containerTitle) {
  let res;
  try {
    res = await qr('INSERT INTO containers(title) VALUES($1) RETURNING *', [containerTitle]);
    console.log('serv.js: Data had been inserted', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to insert container', err.stack);
  } finally {
    // await end();
  }
  return res ? res.rows : null;
}

export async function deleteContainer(idContainer) {
  let res;
  try {
    res = await qr('DELETE FROM containers WHERE id = $1 RETURNING *', [idContainer]);
    console.log('serv.js: Data had been deleted', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to delete container', err.stack);
    return res ? res.rows : null;
  }
}
//
// TodoList Area ==========================================================================================
//
export async function getAllTodoList(container_id) {
  let res;
  try {
    res = await qr('SELECT * FROM todolist WHERE container_id = $1 ORDER BY position ASC', [container_id]);
    console.log('serv.js: Data had been taken', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to take all TodoList', err.stack);
  } finally {
    // await end();
  }
  return res ? res.rows : null;
}

export async function addTodoList(container_id, task) {
  let res;
  try {
    res = await qr('INSERT INTO todolist(container_id, task) VALUES($1, $2) RETURNING *', [container_id, task]);
    console.log('serv.js: TodoList had Been Added', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to Add TodoList', err.stack);
  }
  return res ? res.rows : null;
}

export async function deleteTodoList(idTodoList = null, idContainer, completed = null) {
  let res;
  try {
    let query;
    let queryParams;

    if (completed !== null && completed !== undefined) {
      query = 'DELETE FROM todolist WHERE container_id = $1 AND completed = $2 RETURNING *';
      queryParams = [idContainer, completed];
    } else {
      query = 'DELETE FROM todolist WHERE id = $1 RETURNING *';
      queryParams = [idTodoList];
    }
    res = await qr(query, queryParams);
    console.log('serv.js: Data had been deleted', res.rows);
  } catch (err) {
    console.error('serv.js: Failed to delete todolist', err.stack);
    return res ? res.rows : null;
  }
}

export async function changeCompletedStatus(completed, idTodoList = null, idContainer) {
  let res;
  try {
    let query;
    let queryParams;

    if (idTodoList !== null && idTodoList !== undefined) {
      query = 'UPDATE todolist SET completed = $1 WHERE id = $2 RETURNING *';
      queryParams = [completed, idTodoList];
    } else {
      query = 'UPDATE todolist SET completed = $1 WHERE container_id = $2 RETURNING *';
      queryParams = [completed, idContainer];
    }
    res = await qr(query, queryParams);
    console.log('serv.js: Completed Status Has Been Changed');
  } catch (err) {
    console.error('serv.js: Failed to Change Status Completed', err.stack);
  }
  return res ? res.rows : null;
}

export async function updateTodoListPosition(idTodoList, positionTodoList) {
  try {
    await qr('UPDATE todolist SET position = $1 WHERE id = $2', [positionTodoList, idTodoList]);
    console.log(`serv.js: Position updated for ID ${idTodoList}`);
  } catch (err) {
    console.error('serv.js: Failed to update position', err.stack);
  }
}
