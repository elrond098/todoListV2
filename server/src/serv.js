import qr, { end } from './db.js';
//
// Containers Area ===================================================================================
//
export async function display() {
  let res;
  try {
    res = await qr('SELECT * FROM Containers ORDER BY id ASC');
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
    res = await qr('SELECT * FROM todolist WHERE countainer_id = $1 ORDER BY position ASC', [params]);
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

export async function deleteTodoList(idTodoList = null, idContainer, completed = null) {
  let res;
  try {
    let query;
    let queryParams;

    if (completed !== null && completed !== undefined) {
      query = 'DELETE FROM todolist WHERE countainer_id = $1 AND completed = $2 RETURNING *';
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

// export async function changeCompletedStatus(params, params2) {
//   let res;
//   try {
//     res = await qr('UPDATE todolist SET completed = $1 WHERE id = $2 RETURNING *', [params, params2]);
//     console.log('serv.js: Completed Status Has Been Changed');
//   } catch (err) {
//     console.error('serv.js: Failed to Change Status Completed', err.stack);
//   }
//   return res ? res.rows : null;
// }
//

export async function changeCompletedStatus(completed, id = null, idContainer) {
  let res;
  try {
    let query;
    let queryParams;

    if (id !== null && id !== undefined) {
      // 🎯 Mode 1: Mengubah spesifik (Hanya yang memiliki ID tersebut)
      query = 'UPDATE todolist SET completed = $1 WHERE id = $2 RETURNING *';
      queryParams = [completed, id];
    } else {
      // 🌍 Mode 2: Mengubah keseluruhan (Semua data di dalam tabel)
      query = 'UPDATE todolist SET completed = $1 WHERE countainer_id = $2 RETURNING *';
      queryParams = [completed, idContainer];
    }

    res = await qr(query, queryParams);
    console.log('serv.js: Completed Status Has Been Changed');
  } catch (err) {
    console.error('serv.js: Failed to Change Status Completed', err.stack);
  }
  return res ? res.rows : null;
}


export async function updateTodoPosition(id, position) {
  try {
    await qr('UPDATE todolist SET position = $1 WHERE id = $2', [position, id]);
    console.log(`serv.js: Position updated for ID ${id}`);
  } catch (err) {
    console.error('serv.js: Failed to update position', err.stack);
  }
}
