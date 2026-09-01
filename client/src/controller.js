let httpPath = 'http://localhost:3000/';

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
