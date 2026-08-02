export async function addContainer(params) {
  try {
  const res = await fetch('http://localhost:3000/ctnr/add', {
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
    console.log('controller.js: Respones from server:', result);
  } catch (error) {
    console.error('controller.js: Failed send container:', error);
  }
}

// addContainer({container: 'Test 2'});
