import { startTodoListPage } from '../../main.js';

export function displayContainer(containerStorage, onDelete) {
  const ulElement = document.getElementById('ul-list');
  ulElement.innerHTML = '';
  containerStorage.forEach((container) => {
    const liElement = document.createElement('li');
    liElement.className = 'theListOfContainer';

    const navigationButtonElement = document.createElement('button');
    navigationButtonElement.textContent = container.title;
    navigationButtonElement.className = 'listNav';
    navigationButtonElement.addEventListener('click', () => startTodoListPage(container))

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.textContent = 'Delete';
    deleteButtonElement.className = 'delete-container'
    deleteButtonElement.addEventListener('click', () => onDelete(container.id));
    liElement.appendChild(navigationButtonElement);
    liElement.appendChild(deleteButtonElement);
    ulElement.appendChild(liElement);
  })
}
