var clearCompletedButton = document.getElementById("clear-completed-button");
clearCompletedButton.addEventListener("click", clearCompletedToDoItems);

var clearInputButton = document.getElementById("clear-input-button");
clearInputButton.addEventListener("click", clearInput);

var emptyListButton = document.getElementById("empty-button");
emptyListButton.addEventListener("click", emptyList);

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

var inputField = document.getElementById("todo-entry-box");
inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        e.preventDefault(); //prevents page refresh, I don't know why and how, but it works
        addToDoItem();
    }
});

function clearInput() {
    toDoEntryBox.value = "";
    toDoEntryBox.focus();
}

function newToDoItem(itemText, completed) {
    if (itemText.length != 0) {

        var toDoItem = document.createElement("li");
        var toDoText = document.createTextNode(itemText);
        toDoItem.appendChild(toDoText);

        if (completed) {
            toDoItem.classList.add("completed");
        }

        toDoList.appendChild(toDoItem);
        toDoItem.addEventListener("dblclick", toggleToDoItemState);
    }
}

function addToDoItem() {
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
    toDoEntryBox.value = "";
    saveList();
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }

    saveList();
    toDoEntryBox.focus();
}

function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }

    saveList();
    toDoEntryBox.focus();
}

function emptyList() {
    var toDoItems = toDoList.children;

    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }

    saveList();
    toDoEntryBox.focus();
}

var toDoInfo = {
    "task": "Thing I need to do",
    "completed": false
};

function saveList() {
    //todo: do saving to DB, remove saving to localStorage
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    //todo: do loading from DB, remove loading from localStorage
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }

    setTimeout(function () {
        $('#alert-message').fadeOut('fast');
    }, 3000); //remove alert message after 3 seconds

}

loadList();