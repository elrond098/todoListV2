export function formFragTodo(title) {
  return `
    <main class="app-shell">
        <h1>${title.countained_name}</h1>

        <form id="todo-form" class="todo-form">
            <input id="todo-input" type="text" placeholder="Tambahkan tugas baru..." autocomplete="off" />
            <button type="submit">Tambah</button>
        </form>

        <div id="tab" class="tab">
            <select id="sort" class="sort" name="sort">
                <option value="up">Terbaru</option>
                <option value="down">Terlama</option>
            </select>
            <div class="filters">
                <button class="filter-button active" data-filter="all">Semua</button>
                <button class="filter-button" data-filter="active">Aktif</button>
                <button class="filter-button" data-filter="completed">Selesai</button>
            </div>

            <div>
                <button id="select" class="select">Select All</button>
            </div>
        </div>

        <ul id="todo-list" class="todo-list"></ul>

        <div class="toolbar">
            <span id="todo-count">0 tugas</span>
            <button id="clear-completed" class="text-button">Hapus Selesai</button>
        </div>
    </main>
`;
} 
