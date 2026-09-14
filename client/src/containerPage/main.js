import { reqAddContainer, reqAllContainerData, reqDeleteContainer } from '../controller.js';
import { displayContainer } from './components/displayContainer.js';

export default async function containerScript(containerStorage) {
  const addButton = document.getElementById('form');
  const inputValue = document.getElementById('input-ctnr');

  async function onDelete(id) {
    await reqDeleteContainer({ id });
    await reqAllContainerData(containerStorage);
    displayContainer(containerStorage, onDelete);
  }

  await reqAllContainerData(containerStorage);
  displayContainer(containerStorage, onDelete);

  addButton.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentInputValue = inputValue.value;
    await reqAddContainer({ title: currentInputValue }, containerStorage);
    console.log('main.js: The List Of Container:', containerStorage)
    displayContainer(containerStorage, onDelete);
    inputValue.value = '';
  });
}
