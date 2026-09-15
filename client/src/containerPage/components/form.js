import '../style/style.css';

export function formFragContainer() {
  return `
    <div class="wrapper-page1">
      <div class="right-page1">
        <h1>Add New Container</h1>
        <form id="form" class="form-container">
          <input type="text" id="input-ctnr" required />
          <button type="submit" id="btn-add">Add</button>
        </form>
      </div>

      <div class="left-page1">
        <ul class="container-list" id="ul-list"></ul>
      </div>
    </div>
  `;
}
