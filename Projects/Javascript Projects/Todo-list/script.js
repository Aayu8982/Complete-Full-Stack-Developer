const item = document.querySelector("#item");
const toDoBox = document.querySelector("#todo-box");
let todos = []

item.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addToDo(this.value);
    this.value = "";
  }
});

const addToDo = (item) => {
  const listitem = document.createElement("li");

  listitem.innerHTML = `
    ${item}
    <i class="fas fa-times"></i>
  `;

  listitem.addEventListener("click", function () {
    this.classList.toggle("done");
  });

  listitem.querySelector("i").addEventListener("click", function (e) {
    e.stopPropagation();
    listitem.remove();

    // Remove item from todos array
    todos = todos.filter(todo => todo !== item);
    console.log(todos)

    // Update localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  todos.push(item);
  localStorage.setItem('todos', JSON.stringify(todos));

  toDoBox.appendChild(listitem);
};


(function(){
    const todoList = localStorage.getItem('todos');
    console.log(todos)
    JSON.parse(todoList).forEach((todo)=>{
        addToDo(todo)
    })

})()