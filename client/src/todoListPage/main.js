import { reqAllTodoListData } from '../controller.js';
import { todoListLogic } from './components/todoListLogic.js';

export default async function todoListScript(todoListStorage, container) {
  await reqAllTodoListData(todoListStorage, { idContainer: container.id });
  todoListLogic(todoListStorage, container)
}
