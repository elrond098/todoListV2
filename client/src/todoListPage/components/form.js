export function formFragTodo(container) {
  return `<div class='wrapper-todolist1'><div class='wrapper-todolist'>
<main class="app-shell">
<div class='header-todolist'><h1 class='title-todolist'>${container.title}</h1>
<button class='back-page1' id='back-page1'>Back</button></div>

<form id="todo-form" class="todo-form">
<input id="todo-input" type="text" placeholder="Tambahkan tugas baru..." autocomplete="off" />
<button type="submit">Tambah</button>
</form>

<div id="tab" class="tab">
<select id="sort" class="sort" name="sort">
<option value="down">Terlama</option>
<option value="up">Terbaru</option>
</select>
<div class="filters">
<button class="filter-button active" data-filter="all">Semua</button>
<button class="filter-button" data-filter="active">Aktif</button>
<button class="filter-button" data-filter="completed">Selesai</button>
</div>

<div class='select'>
<button id="select">Select All</button>
</div>
</div>

<ul id="todo-list" class="todo-list"></ul>

<div class="toolbar">
<span id="todo-count">0 tugas</span>
<button id="clear-completed" class="text-button">Hapus Selesai</button>
</div>
</main></div></div>
`;
} 
