import { reqAddTodoList, reqAllTodoListData, reqDeleteTodoList, reqChangeCompletedStatus, reqUpdateTodoPosition } from '../../controller.js';
import '../style/style.css';
import { startContainerPage } from '../../main.js';

export async function todoListLogic(todoListStorage, container) {
  const todoFormElement = document.getElementById('todo-form');
  const todoInputElement = document.getElementById('todo-input');
  const todoListUlElement = document.getElementById('todo-list');
  const todoCountElement = document.getElementById('todo-count');
  const todoClearCompletedButtonElement = document.getElementById('clear-completed');
  const todoFilterButtonsElement = document.querySelectorAll('.filter-button');
  const todoSortSelectElement = document.getElementById("sort");
  const todoSelectElement = document.getElementById('select');
  const backPage1ButtonElement = document.getElementById('back-page1');

  let activeFilter = 'all';

  todoSelectElement.addEventListener('click', () => {
    const completedTodoListStatus = todoListStorage.some(todoList => !todoList.completed);
    selectAllTodoList(completedTodoListStatus);
  });

  async function selectAllTodoList(completedTodoListStatus) {
    todoListStorage = todoListStorage.map(todoList => ({
      ...todoList,
      completed: completedTodoListStatus
    }));
    await reqChangeCompletedStatus({ completed: completedTodoListStatus, idContainer: container.id }, todoListStorage)
    renderTodoList();
  }
  todoSortSelectElement.addEventListener('change', () => {
    if (todoSortSelectElement.value === 'up') {
      todoListStorage.sort((a, b) => b.id - a.id);
    } else if (todoSortSelectElement.value === 'down') {
      todoListStorage.sort((a, b) => a.id - b.id);
    }
    renderTodoList();
  });

  function updateTodoListCount() {
    const countTodoList = todoListStorage.filter(todoList => !todoList.completed).length;
    todoCountElement.textContent = `${countTodoList} tugas tersisa`;
  }

  function renderTodoList() {
    todoListUlElement.innerHTML = '';

    const visibleTodoList = todoListStorage.filter(todoList => {
      if (activeFilter === 'active') return !todoList.completed;
      if (activeFilter === 'completed') return todoList.completed;
      return true;
    });

    visibleTodoList.forEach(todoList => {
      const containerTodoListElement_Li = document.createElement('li');
      containerTodoListElement_Li.className = `todo-item${todoList.completed ? ' completed' : ''}`;

      const checkboxTodoListElement_input = document.createElement('input');
      checkboxTodoListElement_input.type = 'checkbox';
      checkboxTodoListElement_input.checked = todoList.completed;
      checkboxTodoListElement_input.addEventListener('change', () => toggleCompletedTodoList(todoList));

      const todoListValueElement_p = document.createElement('p');
      todoListValueElement_p.className = 'todo-text';
      todoListValueElement_p.textContent = todoList.task;

      const actionsTodoListContainer_div = document.createElement('div');
      actionsTodoListContainer_div.className = 'todo-actions';

      const realIndex = todoListStorage.findIndex(t => t.id === todoList.id);

      const mvDownTodoListElement_button = document.createElement('button');
      mvDownTodoListElement_button.textContent = "↓";

      mvDownTodoListElement_button.addEventListener('click', () => moveDownTodoList(realIndex, container.id));

      const mvUpTodoListElement_button = document.createElement('button');
      mvUpTodoListElement_button.textContent = "↑";

      mvUpTodoListElement_button.addEventListener('click', () => moveUpTodoList(realIndex, container.id));

      const completeTodoListElement_button = document.createElement('button');
      completeTodoListElement_button.textContent = todoList.completed ? '-' : '+';
      completeTodoListElement_button.addEventListener('click', () => toggleCompletedTodoList(todoList));


      const deleteTodoListElement_button = document.createElement('button');
      deleteTodoListElement_button.textContent = '🗑';
      deleteTodoListElement_button.addEventListener('click', () => removeTodoList(todoList.id));

      actionsTodoListContainer_div.appendChild(completeTodoListElement_button);
      actionsTodoListContainer_div.appendChild(deleteTodoListElement_button);
      actionsTodoListContainer_div.appendChild(mvUpTodoListElement_button);
      actionsTodoListContainer_div.appendChild(mvDownTodoListElement_button);

      containerTodoListElement_Li.appendChild(checkboxTodoListElement_input);
      containerTodoListElement_Li.appendChild(todoListValueElement_p);
      containerTodoListElement_Li.appendChild(actionsTodoListContainer_div);
      todoListUlElement.appendChild(containerTodoListElement_Li);
    });
    updateTodoListCount();
  }

  async function moveUpTodoList(index, containerId) {
    if (index === 0 || !todoListStorage[index] || !todoListStorage[index - 1]) return;
    const idDataYangNaik = todoListStorage[index].id;
    const idDataYangTurun = todoListStorage[index - 1].id;
    [todoListStorage[index - 1], todoListStorage[index]] = [todoListStorage[index], todoListStorage[index - 1]];
    await reqUpdateTodoPosition({ idTodoList: idDataYangNaik, position: index - 1, idContainer: containerId }, todoListStorage);
    await reqUpdateTodoPosition({ idTodoList: idDataYangTurun, position: index, idContainer: containerId }, todoListStorage);
    renderTodoList();
  }

  async function moveDownTodoList(index, containerId) {
    if (index === todoListStorage.length - 1 || !todoListStorage[index] || !todoListStorage[index + 1]) return;
    const idDataYangTurun = todoListStorage[index].id;
    const idDataYangNaik = todoListStorage[index + 1].id;
    [todoListStorage[index], todoListStorage[index + 1]] = [todoListStorage[index + 1], todoListStorage[index]];
    await reqUpdateTodoPosition({ idTodoList: idDataYangTurun, position: index + 1, idContainer: containerId }, todoListStorage);
    await reqUpdateTodoPosition({ idTodoList: idDataYangNaik, position: index, idContainer: containerId }, todoListStorage);
    renderTodoList();
  }

  async function toggleCompletedTodoList(todoList) {
    const { id, completed } = todoList;
    const newStatus = !completed
    todoListStorage = todoListStorage.map(todoList =>
      todoList.id === id ? { ...todoList, completed: !todoList.completed } : todoList
    );
    await reqChangeCompletedStatus({ idTodoList: id, completed: newStatus, idContainer: container.id }, todoListStorage)
    renderTodoList();
  }

  async function removeTodoList(todoListId) {
    const { id } = container;
    await reqDeleteTodoList({ idTodoList: todoListId, idContainer: id }, todoListStorage);
    renderTodoList();
  }

  async function clearCompletedTodoList() {
    const { id } = container;
    await reqDeleteTodoList({ idContainer: id, completed: true }, todoListStorage);
    renderTodoList();
  }

  todoFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { id } = container;
    await reqAddTodoList({ task: todoInputElement.value, idContainer: id }, todoListStorage);
    todoInputElement.value = '';
    todoInputElement.focus();
    renderTodoList();
  });

  todoClearCompletedButtonElement.addEventListener('click', () => { clearCompletedTodoList();});

  todoFilterButtonsElement.forEach(button => {
    button.addEventListener('click', () => {
      todoFilterButtonsElement.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter;
      renderTodoList();
    });
  });

  backPage1ButtonElement.addEventListener('click', () => document.getElementById('app').innerHtml = startContainerPage());

  renderTodoList();
}

