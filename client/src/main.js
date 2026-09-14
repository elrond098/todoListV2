import todoListScript from './todoListPage/main.js';
import containerScript from './containerPage/main.js';
import { formFragContainer } from './containerPage/components/form.js';
import { formFragTodo } from './todoListPage/components/form.js';
import { displayHomePage } from './homepage/display.js';
import { homePageScript } from './homepage/main.js';


export async function startContainerPage() {
  document.getElementById('app').innerHTML = formFragContainer();

  let containerStorage = [];
  containerScript(containerStorage);
}

export async function startTodoListPage(container) {
  document.getElementById('app').innerHTML = formFragTodo(container);

  let todoListStorage = [];
  todoListScript(todoListStorage, container);
}

function startHomePage() {
  document.getElementById('app').innerHTML = displayHomePage();
  homePageScript();
}
startHomePage();

