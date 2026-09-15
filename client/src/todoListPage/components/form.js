export function formFragTodo(container) {
  return `
    <div class="wrapper-todolist1">
      <div class="wrapper-todolist">
        <main class="app-shell">
          <div class="header-todolist">
            <h1 class="title-todolist">${container.title}</h1>
            <button class="back-page1" id="back-page1">Back</button>
          </div>

          <form id="todo-form" class="todo-form">
            <input id="todo-input" type="text" placeholder="Add a new task..." autocomplete="off" />
            <button type="submit">Add</button>
          </form>

          <div id="tab" class="tab">
            <select id="sort" class="sort" name="sort">
              <option value="down">Oldest</option>
              <option value="up">Newest</option>
            </select>

            <div class="filters">
              <button class="filter-button active" data-filter="all">All</button>
              <button class="filter-button" data-filter="active">Active</button>
              <button class="filter-button" data-filter="completed">Completed</button>
            </div>

            <div class="select">
              <button id="select">Select All</button>
            </div>
          </div>

          <ul id="todo-list" class="todo-list"></ul>

          <div class="toolbar">
            <span id="todo-count">0 tasks</span>
            <button id="clear-completed" class="text-button">Clear Completed</button>
          </div>
        </main>
      </div>
    </div>
  `;
}
