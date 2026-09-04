import { addContainer, dspContainer, deleteContainer } from '../controller.js';
import { displayctnr } from './components/dsplctnr.js';

export default async function container(data) {
  const btnAdd = document.getElementById('form');
  const inputEl = document.getElementById('input-ctnr');

  async function onDelete(id) {
    await deleteContainer({ id });
    await dspContainer(data);
    displayctnr(data, onDelete);
  }

  await dspContainer(data);
  displayctnr(data, onDelete);

  btnAdd.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentInputValue = inputEl.value;
    await addContainer({ container: currentInputValue }, data);
    console.log('main.js: The List Of Container:', data)
    displayctnr(data, onDelete);
    inputEl.value = '';
  });
}
