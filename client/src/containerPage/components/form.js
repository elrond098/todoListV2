import '../style/style.css';

export function formFragContainer() {
  return `<div class='wrapper-page1'><div class='right-page1'><h1>Add New Container</h1><form id='form' class='form-container'>

<!-- 1. Tambahkan type="text" demi kepastian elemen browser -->
<input type="text" id='input-ctnr' required />

<!-- 2. Tambahkan type="button" agar klik tombol tidak men-trigger reload halaman -->
<button type="submit" id='btn-add'>Add</button>
</form>  </div>
<div class='left-page1'><ul class='container-list' id="ul-list"></ul></div></div>`;
}

