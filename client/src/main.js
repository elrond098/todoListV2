import todoList from './page2/main.js';
import container from './page1/main.js';
import { formFrag } from './page1/components/form.js';
import { formFragTodo } from './page2/components/form.js';


export async function startPage1() {
  document.getElementById('app').innerHTML = formFrag();

  let todos = [];
  container(todos);
}

export async function startPage2(container) {
  document.getElementById('app').innerHTML = formFragTodo(container);

  let todos = [];
  todoList(todos, container);
}

startPage1();

