export function formFrag() {
  return `<form id='form'>
            <label for='input-ctnr'>Enter Container Name</label>
            <!-- 1. Tambahkan type="text" demi kepastian elemen browser -->
            <input type="text" id='input-ctnr' required />
            
            <!-- 2. Tambahkan type="button" agar klik tombol tidak men-trigger reload halaman -->
            <button type="submit" id='btn-add'>Add</button>
            <button type="button" id='btn'>Cancel</button>
          </form>  <ul id="list"></ul>`;
}

