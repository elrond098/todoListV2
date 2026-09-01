
import { formFrag } from './page1/components/form.js';
import { addContainer, dspContainer, deleteContainer } from './controller.js';
import { displayctnr } from './page1/components/dsplctnr.js';

async function start() {
  // 1. Render form ke dalam HTML
  document.getElementById('app').innerHTML = formFrag();

  const btnAdd = document.getElementById('form');
  // Ambil elemen inputnya saja (jangan .value dulu)
  const inputEl = document.getElementById('input-ctnr');

  async function onDelete(id) {
    await deleteContainer({ id });
    await dspContainer(todos);
    displayctnr(todos, onDelete);
  }

  let todos = [];
  await dspContainer(todos);
  displayctnr(todos, onDelete);
  // 2. Tambahkan event listener dengan benar
  btnAdd.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Ambil nilai teks TERBARU yang sedang diketik user saat tombol diklik
    const currentInputValue = inputEl.value;

    // Kirim data objek ke fungsi controller
    await addContainer({ container: currentInputValue }, todos);
    console.log('main.js: The List Of Container:', todos)
    displayctnr(todos, onDelete);
    inputEl.value = '';
  });
};

start();
