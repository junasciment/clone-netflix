
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.navbar-container,.toggle,.sidebar,.left-menu-icon"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

document.getElementById('addBtn').addEventListener('click', function(e) {
    e.preventDefault();
    addTodoItem();
});

function addTodoItem() {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.querySelector('.todo-list');
    const todoText = todoInput.value.trim();
    
    if (todoText !== '') {
        const listItem = createTodoItem(todoText, false);
        todoList.appendChild(listItem);
        saveTodos();
        todoInput.value = '';
    }
}

function createTodoItem(text, isChecked) {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.innerHTML = `
        <label class="checkbox-container">
            <input type="checkbox" ${isChecked ? 'checked' : ''}>
            <span class="checkbox-custom"></span>
        </label>
        <span class="todo-text">${text}</span>
    `;
    listItem.querySelector('input[type="checkbox"]').addEventListener('change', saveTodos);
    return listItem;
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        const text = item.querySelector('.todo-text').textContent;
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        todos.push({ text, isChecked });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const listItem = createTodoItem(todo.text, todo.isChecked);
        document.querySelector('.todo-list').appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', loadTodos);

