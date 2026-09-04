import { addTodoList, dspTodoList, deleteContainer } from '../../controller.js';
import '../style/style.css';

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

  let activeFilter = 'all';

  select.addEventListener('click', () => {
    if (select.textContent === 'Select All') {
      select.textContent = 'Deselect All';
      selectAll(true);
    } else {
      select.textContent = 'Select All';
      selectAll(false);
    }
  });

  function selectAll(f) {
    todos = todos.map(todo => ({
      ...todo,
      completed: f
    }));
    renderTodos();
  }
  sortSelect.addEventListener('change', () => {
    if (sortSelect.value === 'up') {
      todos.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortSelect.value === 'down') {
      todos.sort((a, b) => a.createdAt - b.createdAt);
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
      checkbox.addEventListener('change', () => toggleTodo(todo.id));

      const text = document.createElement('p');
      text.className = 'todo-text';
      text.textContent = todo.title;

      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const realIndex = todos.findIndex(t => t.id === todo.id);

      const mvDown = document.createElement('button');
      mvDown.textContent = "↓";

      mvDown.addEventListener('click', () => moveDown(realIndex));

      const mvUp = document.createElement('button');
      mvUp.textContent = "↑";

      mvUp.addEventListener('click', () => moveUp(realIndex));

      const completeButton = document.createElement('button');
      completeButton.textContent = todo.completed ? '-' : '+';
      completeButton.addEventListener('click', () => toggleTodo(todo.id));


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
  function moveUp(index) {
    if (index === 0) return;

    [todos[index - 1], todos[index]] =
      [todos[index], todos[index - 1]];

    // saveTodos();
    renderTodos();
  }

  function moveDown(index) {
    if (index === todos.length - 1) return;

    [todos[index], todos[index + 1]] =
      [todos[index + 1], todos[index]];

    // saveTodos();
    renderTodos();
  }

  function toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    // saveTodos();
    renderTodos();
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    // saveTodos();
    renderTodos();
  }

  function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
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

  renderTodos();
}


