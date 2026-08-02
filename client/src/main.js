
import { formFrag } from './page1/components/form.js';
import { addContainer } from './controller.js';

// 1. Render form ke dalam HTML
document.getElementById('app').innerHTML = formFrag();

const btnAdd = document.getElementById('btn-add');
// Ambil elemen inputnya saja (jangan .value dulu)
const inputEl = document.getElementById('input-ctnr'); 

// 2. Tambahkan event listener dengan benar
btnAdd.addEventListener('click', (e) => {
  e.preventDefault();
  // Ambil nilai teks TERBARU yang sedang diketik user saat tombol diklik
  const currentInputValue = inputEl.value; 
  
  // Kirim data objek ke fungsi controller
  addContainer({ container: currentInputValue });
});

