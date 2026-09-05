import { addTodoList, dspTodoList, deleteTodoList, changeCompletedStatus, updateTodoPosition } from '../../controller.js';
import '../style/style.css';
import { startPage1 } from '../../main.js';
// export function displayTodoList(params) {
//   const todoList = document.getElementById('todo-list');
//   todoList.innerHTML = '';
//   params.forEach((ctnr) => {
//     const li = document.createElement('li');
//     li.className = 'theListOfContainer';
//     li.textContent = ctnr.title;
//
//     todoList.appendChild(li);
//   })
// }

export async function todoListComp(todos, idTodo) {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const todoCount = document.getElementById('todo-count');
  const clearCompletedButton = document.getElementById('clear-completed');
  const filterButtons = document.querySelectorAll('.filter-button');
  const sortSelect = document.getElementById("sort");
  const select = document.getElementById('select');
  const backButton = document.getElementById('back-page1');

  let activeFilter = 'all';

  select.addEventListener('click', () => {
    const hasUncompleted = todos.some(todo => !todo.completed);
    selectAll(hasUncompleted);
  });

  async function selectAll(f) {
    todos = todos.map(todo => ({
      ...todo,
      completed: f
    }));
    await changeCompletedStatus({ completed: f, id: idTodo.id }, todos)
    renderTodos();
  }
  sortSelect.addEventListener('change', () => {
    if (sortSelect.value === 'up') {
      todos.sort((a, b) => b.id - a.id);
    } else if (sortSelect.value === 'down') {
      todos.sort((a, b) => a.id - b.id);
    }

    renderTodos();
  });

  // function saveTodos() {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  // }
  //
  function updateCount() {
    const count = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${count} tugas tersisa`;
  }

  function renderTodos() {
    todoList.innerHTML = '';

    const visibleTodos = todos.filter(todo => {
      if (activeFilter === 'active') return !todo.completed;
      if (activeFilter === 'completed') return todo.completed;
      return true;
    });

    visibleTodos.forEach(todo => {
      const item = document.createElement('li');
      item.className = `todo-item${todo.completed ? ' completed' : ''}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => toggleTodo(todo));

      const text = document.createElement('p');
      text.className = 'todo-text';
      text.textContent = todo.title;

      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const realIndex = todos.findIndex(t => t.id === todo.id);

      const mvDown = document.createElement('button');
      mvDown.textContent = "↓";

      mvDown.addEventListener('click', () => moveDown(realIndex, idTodo.id));

      const mvUp = document.createElement('button');
      mvUp.textContent = "↑";

      mvUp.addEventListener('click', () => moveUp(realIndex, idTodo.id));

      const completeButton = document.createElement('button');
      completeButton.textContent = todo.completed ? '-' : '+';
      completeButton.addEventListener('click', () => toggleTodo(todo));


      const deleteButton = document.createElement('button');
      deleteButton.textContent = '🗑';
      deleteButton.addEventListener('click', () => removeTodo(todo.id));

      actions.appendChild(completeButton);
      actions.appendChild(deleteButton);
      actions.appendChild(mvUp);
      actions.appendChild(mvDown);

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(actions);
      todoList.appendChild(item);
    });

    updateCount();
  }

  // function addTodo(text) {
  //   if (!text.trim()) return;
  //
  //   todos.unshift({
  //     text: text.trim(),
  //   });
  //
  //   // saveTodos();
  //   renderTodos();
  // }
  //
  // function moveUp(index) {
  //   if (index === 0) return;
  //
  //   [todos[index - 1], todos[index]] =
  //     [todos[index], todos[index - 1]];
  //
  //   // saveTodos();
  //   renderTodos();
  // }
  //
  // function moveDown(index) {
  //   if (index === todos.length - 1) return;
  //
  //   [todos[index], todos[index + 1]] =
  //     [todos[index + 1], todos[index]];
  //
  //   // saveTodos();
  //   renderTodos();
  // }
  //



  async function moveUp(index, todoData) {
    if (index === 0 || !todos[index] || !todos[index - 1]) return;

    // 💡 Ambil ID-nya terlebih dahulu saat objeknya masih aman berada di tempatnya
    const idDataYangNaik = todos[index].id;
    const idDataYangTurun = todos[index - 1].id;

    // 1. Tukar posisi di array lokal (frontend)
    [todos[index - 1], todos[index]] = [todos[index], todos[index - 1]];

    // 2. Kirim ke database menggunakan ID yang sudah kita simpan dengan aman tadi
    await updateTodoPosition({ idTodoList: idDataYangNaik, position: index - 1, id: todoData }, todos);
    await updateTodoPosition({ idTodoList: idDataYangTurun, position: index, id: todoData }, todos);

    renderTodos();
  }

  async function moveDown(index, todoData) {
    if (index === todos.length - 1 || !todos[index] || !todos[index + 1]) return;

    // 💡 Ambil ID-nya terlebih dahulu saat objeknya masih aman berada di tempatnya
    const idDataYangTurun = todos[index].id;
    const idDataYangNaik = todos[index + 1].id;

    // 1. Tukar posisi di array lokal
    [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];

    // 2. Kirim ke database menggunakan ID yang sudah disimpan
    await updateTodoPosition({ idTodoList: idDataYangTurun, position: index + 1, id: todoData }, todos);
    await updateTodoPosition({ idTodoList: idDataYangNaik, position: index, id: todoData }, todos);

    renderTodos();
  }

  async function toggleTodo(todoData) {
    const { id, completed } = todoData;
    const newStatus = !completed
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await changeCompletedStatus({ idTodoList: id, completed: newStatus, id: idTodo.id }, todos)
    // saveTodos();
    renderTodos();
  }

  async function removeTodo(todoData) {
    const { id } = idTodo;
    await deleteTodoList({ idTodoList: todoData, id: id }, todos);
    // todos = todos.filter(todo => todo.id !== id);
    // saveTodos();
    renderTodos();
  }

  async function clearCompleted() {
    const { id } = idTodo;
    await deleteTodoList({ id: id, completed: true }, todos);

    // todos = todos.filter(todo => !todo.completed);
    // saveTodos();
    renderTodos();
  }

  todoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { id } = idTodo;
    await addTodoList({ title: todoInput.value, id: id }, todos);
    todoInput.value = '';
    todoInput.focus();
    renderTodos();
  });



  clearCompletedButton.addEventListener('click', clearCompleted);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter;
      renderTodos();
    });
  });

  backButton.addEventListener('click', () => document.getElementById('app').innerHtml = startPage1());

  renderTodos();
}


