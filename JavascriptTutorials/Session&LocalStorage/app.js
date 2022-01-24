//buton
const add = document.querySelector("#add");
const del = document.querySelector("#delete");
const clear = document.querySelector("#clear");
//input
const addkey = document.querySelector("#addkey");
const addvalue = document.querySelector("#addvalue");
const deletekey = document.querySelector("#deletekey");

add.addEventListener("click",addItem);
del.addEventListener("click",deleteItem);
clear.addEventListener("click",clearItem);

function addItem(e) {
    //sessionStorage.setItem(addkey.value,addvalue.value);
    localStorage.setItem(addkey.value,addvalue.value);
}

function deleteItem(e) {
    //sessionStorage.removeItem(deletekey.value);
    localStorage.removeItem(deletekey.value);
}

function clearItem(e) {
    //sessionStorage.clear();
    localStorage.clear();
}

const todos = ["Todo 1","Todo 2","Todo 3"];
localStorage.setItem("todos",JSON.stringify(todos));
let todoArray = JSON.parse(localStorage.getItem("todos"));
console.log(todoArray);
