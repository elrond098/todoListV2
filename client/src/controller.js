let httpPath = 'http://localhost:3000/';
//
// Container Area ===================================================================================
//
export async function addContainer(params, params2) {
  try {
    const res = await fetch(httpPath + 'ctnr/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed send container:', error);
  }

  await dspContainer(params2);
}

export async function dspContainer(params) {
  let result;

  try {
    const res = await fetch(httpPath + 'ctnr/display', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed get containers:', error);
    return;
  }

  params.length = 0;
  params.push(...result.data);
}

export async function deleteContainer(params) {
  try {
    const res = await fetch(httpPath + 'ctnr/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed delete container:', error);
  }
}
//
// TodoList Area ========================================================================================================
//
export async function addTodoList(params, params2) {
  try {
    const res = await fetch(httpPath + 'todolist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed send todolist:', error);
  }

  await dspTodoList(params2, params);
}

export async function dspTodoList(params, params2) {
  let result;

  try {
    const res = await fetch(httpPath + 'todolist/display', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params2)
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed get todolist:', error);
    return;
  }

  params.length = 0;
  params.push(...result.data);
}

export async function deleteTodoList(params, params2) {
  try {
    const res = await fetch(httpPath + 'todolist/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed delete todolist:', error);
  }
  await dspTodoList(params2, params);
}

export async function changeCompletedStatus(params, params2) {
  try {
    const res = await fetch(httpPath + 'todolist/changecompletedstatus', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed change status completed todolist:', error);
  }
  await dspTodoList(params2, params);
}

export async function updateTodoPosition(params, params2) {
  try {
    const res = await fetch(httpPath + 'todolist/changeposition', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log('controller.js: Responses from server:', result);
  } catch (error) {
    console.error('controller.js: Failed change status completed todolist:', error);
  }
  await dspTodoList(params2, params);
}


