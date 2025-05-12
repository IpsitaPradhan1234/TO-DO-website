// Get elements
const input = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit');
const todoContainer = document.querySelector('.todo-lists');

// Load todos from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todoText => {
    createTodoElement(todoText);
  });
});

// Handle "Add" button click
submitBtn.addEventListener('click', () => {
  const inputData = input.value.trim();
  if (inputData === "") return;

  createTodoElement(inputData);
  saveTodoToLocal(inputData);
  input.value = "";
});

// Create and display a todo item
function createTodoElement(text) {
  const todo_el = document.createElement('div');
  todo_el.classList.add('todo-item');

  const todo_content_el = document.createElement('div');
  const todo_input_el = document.createElement('input');
  todo_input_el.classList.add('text');
  todo_input_el.type = 'text';
  todo_input_el.value = text;
  todo_input_el.setAttribute('readonly', 'readonly');

  todo_content_el.appendChild(todo_input_el);
  todo_el.appendChild(todo_content_el);

  const todo_actions_el = document.createElement('div');
  todo_actions_el.classList.add('action-items');

  const todo_done_el = document.createElement('i');
  todo_done_el.classList.add('fa-solid', 'fa-check');

  const todo_edit_el = document.createElement('i');
  todo_edit_el.classList.add('fa-solid', 'fa-pen-to-square', 'edit');

  const todo_delete_el = document.createElement('i');
  todo_delete_el.classList.add('fa-solid', 'fa-trash');

  todo_actions_el.appendChild(todo_done_el);
  todo_actions_el.appendChild(todo_edit_el);
  todo_actions_el.appendChild(todo_delete_el);
  todo_el.appendChild(todo_actions_el);

  todoContainer.appendChild(todo_el);

  // DONE functionality
  todo_done_el.addEventListener('click', () => {
    todo_input_el.classList.add('done');
    todo_el.removeChild(todo_actions_el);
  });

  // EDIT functionality
  todo_edit_el.addEventListener('click', () => {
    if (todo_edit_el.classList.contains("edit")) {
      todo_edit_el.classList.remove("edit", "fa-pen-to-square");
      todo_edit_el.classList.add("fa-x", "save");
      todo_input_el.removeAttribute("readonly");
      todo_input_el.focus();
    } else {
      todo_edit_el.classList.remove("save", "fa-x");
      todo_edit_el.classList.add("fa-pen-to-square", "edit");
      todo_input_el.setAttribute("readonly", "readonly");

      updateTodoInLocal(text, todo_input_el.value);
      text = todo_input_el.value;
    }
  });

  // DELETE functionality
  todo_delete_el.addEventListener('click', () => {
    todoContainer.removeChild(todo_el);
    deleteTodoFromLocal(todo_input_el.value);
  });
}

// Save to localStorage
function saveTodoToLocal(todoText) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todoText);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Update edited todo in localStorage
function updateTodoInLocal(oldText, newText) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const index = todos.indexOf(oldText);
  if (index !== -1) {
    todos[index] = newText;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// Delete from localStorage
function deleteTodoFromLocal(todoText) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo !== todoText);
  localStorage.setItem('todos', JSON.stringify(todos));
}
