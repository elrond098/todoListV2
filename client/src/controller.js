let httpPath = 'http://localhost:3000/';
//
// Container Area ===================================================================================
//
export async function reqAddContainer(containerTitle, containerStorage) {
  try {
    const responses = await fetch(httpPath + 'container/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(containerTitle)
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    const convertedResponses = await responses.json();
    console.log('controller.js: Responses from server:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed send container:', error);
  }

  await reqAllContainerData(containerStorage);
}

export async function reqAllContainerData(containerStorage) {
  let convertedResponses;

  try {
    const responses = await fetch(httpPath + 'container/display', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    convertedResponses = await responses.json();
    console.log('controller.js: Responses from BackEnd:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed to request containers:', error);
    return;
  }

  containerStorage.length = 0;
  containerStorage.push(...convertedResponses.data);
}

export async function reqDeleteContainer(containerStorage) {
  try {
    const responses = await fetch(httpPath + 'container/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(containerStorage)
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    const  convertedResponses= await responses.json();
    console.log('controller.js: Responses from BackEnd:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed delete container:', error);
  }
}
//
// TodoList Area ========================================================================================================
//
export async function reqAddTodoList(todoList, todoListStorage) {
  try {
    const responses = await fetch(httpPath + 'todolist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoList)
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    const convertedResponses = await responses.json();
    console.log('controller.js: Responses from BackEnd:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed send Req Add todolist:', error);
  }

  await reqAllTodoListData(todoListStorage, todoList);
}

export async function reqAllTodoListData(todoListStorage, container) {
  let convertedResponses;

  try {
    const responses = await fetch(httpPath + 'todolist/display', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(container)
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    convertedResponses = await responses.json();
    console.log('controller.js: Responses from BackEnd:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed to get all todolist data:', error);
    return;
  }

  todoListStorage.length = 0;
  todoListStorage.push(...convertedResponses.data);
}

export async function reqDeleteTodoList(data, todoListStorage) {
  try {
    const responses = await fetch(httpPath + 'todolist/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    const convertedResponses = await responses.json();
    console.log('controller.js: Responses from BackEnd:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed to req delete todolist:', error);
  }
  await reqAllTodoListData(todoListStorage, data);
}

export async function reqChangeCompletedStatus(data, todoListStorage) {
  try {
    const responses = await fetch(httpPath + 'todolist/changecompletedstatus', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    const convertedResponses = await responses.json();
    console.log('controller.js: Responses from BackEnd:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed req change status completed todolist:', error);
  }
  await reqAllTodoListData(todoListStorage, data);
}

export async function reqUpdateTodoPosition(data, todoListStorage) {
  try {
    const responses = await fetch(httpPath + 'todolist/changeposition', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!responses.ok) {
      throw new Error(`controller.js: HTTP error! Status: ${responses.status}`);
    }

    const convertedResponses = await responses.json();
    console.log('controller.js: Responses from BackEnd:', convertedResponses);
  } catch (error) {
    console.error('controller.js: Failed req change status completed todolist:', error);
  }
  await reqAllTodoListData(todoListStorage, data);
}

