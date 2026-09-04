import { addTodoList, dspTodoList, deleteContainer } from '../controller.js';
import { todoListComp } from './components/dspltodolist.js';

export default async function todoList(todos, container) {
  // const todoInput = document.getElementById('todo-input');
  // const todoForm = document.getElementById('todo-form');
  //
  await dspTodoList(todos, container);
  todoListComp(todos, container)
  //
  // todoForm.addEventListener('submit', async (e) => {
  //   e.preventDefault();
  //   const { id } = container;
  //   const currentInputValue = todoInput.value;
  //   await addTodoList({ title: currentInputValue, id: id }, todos);
  //   console.log('main.js: The List Of TodoList:', todos)
  //   displayTodoList(todos);
  //   todoInput.value = '';
  // });
}
