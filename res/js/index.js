let i = 1;
let itemCount = 0;
let bLocalStorage;

let itemsArray = [];
let buttonsArray = [];

function addItem() {
    let todotext = document.getElementById("todoitem-input").value;

    if (todotext.length <= 1) {
        alert("Please gives yourself something to do!");
    } else if (todotext.length > 1) {
        //Add Items
        let div_element = document.createElement("div");
        div_element.setAttribute("id", "todoItem_" + itemCount);
        div_element.setAttribute("onClick", "crossOffItem(" + itemCount + ")");
        div_element.appendChild(document.createTextNode(todotext));
        document.getElementById("todo-list-item").appendChild(div_element);

        itemsArray.push(div_element.outerHTML);
        localStorage.setItem("items", JSON.stringify(itemsArray));

        //Add button items
        let button_element = document.createElement("i");
        button_element.setAttribute("id", "button_" + itemCount);
        button_element.setAttribute("onClick", "removeItem(" + itemCount + ")");
        button_element.setAttribute("class", "fa fa-remove");
        button_element.setAttribute("style", "font-size:48px;color:red");
        document.getElementById("todo-item-button").appendChild(button_element);
        document.getElementById("todoitem-input").value = " ";

        buttonsArray.push(button_element.outerHTML);
        // console.log(buttonsArray);
        localStorage.setItem("buttons", JSON.stringify(buttonsArray));

        itemCount = i++;
    }
}

function removeItem(item) {
    document.getElementById("todo-list-item");
    document.getElementById("todo-item-button");

    let buttontoremove = document.getElementById("button_" + item);
    let texttoremove = document.getElementById("todoItem_" + item);
    texttoremove.remove();
    buttontoremove.remove();

    updateLocalStorageArray();
}

function crossOffItem(item) {
    let todotext = document.getElementById("todoItem_" + item).innerText;
    let result = todotext.strike();
    document.getElementById("todoItem_" + item).innerHTML = result;
    console.log("todoItem_" + item + " Clicked" + "Value= " + todotext);

    updateLocalStorageArray();
}

//Handles the adding item when enter is pressed instead of the "Add" button
let input = document.getElementById("todoitem-input");
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        addItem();
    }
});

function updateLocalStorageArray() {
    itemsArray = [];
    buttonsArray = [];

    const todo_items = document.getElementById("todo-list-item").children;
    const todo_buttons = document.getElementById("todo-item-button").children;

    listLength = document.getElementById("todo-list-item").childElementCount;
    for (i = 0; i <= listLength - 1; i++) {
        itemsArray.push(todo_items[i].outerHTML);
        buttonsArray.push(todo_buttons[i].outerHTML);
    }
    localStorage.setItem("items", JSON.stringify(itemsArray));
    localStorage.setItem("buttons", JSON.stringify(buttonsArray));
}

function retreiveLocalStorage() {
    const todo_items = document.getElementById("todo-list-item");
    const data_items = JSON.parse(localStorage.getItem("items"));

    data_items.forEach((item) => {
        if (-1 == item.search("<strike>")) {
            let addDiv = document.createElement("div");
            addDiv.setAttribute("id", getItemId(item));
            addDiv.setAttribute("onClick", getItemOnClick(item));
            addDiv.appendChild(document.createTextNode(getItemValue(item)));
            document.getElementById("todo-list-item").appendChild(addDiv);
        } else {
            let addDiv = document.createElement("div");
            addDiv.setAttribute("id", getItemId(item));
            addDiv.setAttribute("onClick", getItemOnClick(item));
            addDiv.appendChild(document.createTextNode(getItemStrikeValue(item)));
            //addDiv.strike();
            document.getElementById("todo-list-item").appendChild(addDiv);
        }
    });

    const data_buttons = JSON.parse(localStorage.getItem("buttons"));
    data_buttons.forEach((item) => {
        let addButton = document.createElement("i");
        addButton.setAttribute("id", getButtonId(item));
        addButton.setAttribute("onClick", getButtonOnclick(item));
        addButton.setAttribute("class", "fa fa-remove");
        addButton.setAttribute("style", "font-size:48px;color:red");
        document.getElementById("todo-item-button").appendChild(addButton);
    });
}

//All of these functions are bad.
function getItemId(item) {
    return item.slice(9, 19);
}

function getItemOnClick(item) {
    return item.slice(30, 45);
}

function getItemValue(item) {
    let startVar = item.search(">");
    let endVar = item.search("</div>");
    return item.slice(startVar + 1, endVar);
}

function getItemStrikeValue(item) {
    let startVar = item.search("<strike>");
    let endVar = item.search("</strike>");
    return item.slice(startVar + 8, endVar);
}

function getButtonId(item) {
    return item.slice(7, 15);
}

function getButtonOnclick(item) {
    return item.slice(26, 39);
}

$(document).ready(function () {
    $("#saveLocalStorage").click(function () {
        bLocalStorage = true;
        localStorage.setItem("storage", bLocalStorage);
    });
    $("#noSave").click(function () {
        bLocalStorage = false;
        localStorage.setItem("storage", bLocalStorage);

        localStorage.clear();
    });
});

window.onload = function () {
    bLocalStorage = localStorage.getItem("storage");

    if (bLocalStorage) {
        document.getElementById("saveLocalStorage").checked = true;
        document.getElementById("noSave").checked = false;
        retreiveLocalStorage();
    } else if (!bLocalStorage) {
        document.getElementById("saveLocalStorage").checked = false;
        document.getElementById("noSave").checked = true;
        localStorage.clear();
    }
};
