const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const form = document.querySelector("#todo-form");
const filter = document.querySelector("#filter");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#clear-todos");

eventlisteners();

function eventlisteners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadToDosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

//add ToDo

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    
    if (newTodo === "") {
        showAlert("danger", "Please add todo");
    }
    else {
        addToDoStorage(newTodo);
        addToDoUI(newTodo);
        showAlert("info", "ToDo added")
    }

    e.preventDefault();
}

function addToDoStorage(newTodo) {
    let todos = getToDosFromStrorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function addToDoUI(newTodo) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete.item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}

///

//getToDo

function getToDosFromStrorage() {
    let todos = (localStorage.getItem("todos") !== null) ? JSON.parse(localStorage.getItem("todos")) : [];
    return todos;
}

function loadToDosUI() {
    let todos = getToDosFromStrorage();
    for (todo of todos) {
        addToDoUI(todo);
    }
}


//delete ToDo

function deleteToDoStorage(deleteTodo) {
    let todos = getToDosFromStrorage();
    if (todos.indexOf(deleteTodo) > -1) todos.splice(todos.indexOf(deleteTodo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        console.log(e.target.textContent);
        deleteToDoStorage(e.target.parentElement.parentElement.textContent);
        e.target.parentElement.parentElement.remove();
        showAlert("info", "ToDo deleted");
    }

}

function clearAllTodos(e) {
    if (confirm("Are you sure?")) {
        // todoList.innerHTML=""; bu olur ama yavas calisir.
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
    }
}

//


//filter toDo

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    for (item of listItems) {
        const text = item.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) item.setAttribute("style", "display:none !important");
        else item.setAttribute("style", "display:block");
    }
}

//



function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2000);
}
