import { startPage2 } from '../../main.js';

export function displayctnr(params, onDelete) {
  const main = document.getElementById('list');
  main.innerHTML = '';
  params.forEach((ctnr) => {
    const li = document.createElement('li');
    li.className = 'theListOfContainer';

    const button = document.createElement('button');
    button.textContent = ctnr.countained_name;
    button.className = 'listNav';
    button.addEventListener('click', () => startPage2(ctnr))

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => onDelete(ctnr.id));

    li.appendChild(button);
    li.appendChild(deleteButton);
    main.appendChild(li);
  })
}
