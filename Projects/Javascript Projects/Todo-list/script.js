const itemInput = document.querySelector("#item");
const toDoBox = document.querySelector("#todo-box");

let todos = loadTodosFromLocalStorage();

itemInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter" && this.value.trim() !== "") {
    const trimmedValue = this.value.trim();
    addToDo(trimmedValue);
    this.value = "";
  }
});

// Add To-Do Item
function addToDo(todoText) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    ${todoText}
    <i class="fas fa-times"></i>
  `;

  listItem.addEventListener("click", () => {
    listItem.classList.toggle("done");
  });

  listItem.querySelector("i").addEventListener("click", (e) => {
    e.stopPropagation();
    removeToDo(todoText, listItem);
  });

  toDoBox.appendChild(listItem);
  todos.push(todoText);
  updateLocalStorage();
}

// Remove To-Do Item
function removeToDo(todoText, listItem) {
  todos = todos.filter(todo => todo !== todoText);
  listItem.remove();
  updateLocalStorage();
}

// Load todos from localStorage
function loadTodosFromLocalStorage() {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load todos:", e);
    return [];
  }
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Initialize
(function initializeToDos() {
  todos.forEach(todo => addToDo(todo));
})();
