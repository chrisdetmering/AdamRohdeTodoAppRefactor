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
        addItemToVolatileMemory(todotext);
        addItemToLocalStorageArray(todotext);
    }
}
function addItemToVolatileMemory(todotext) {
    //text
    console.log("addItemToVolatileMemory " + todotext);
    let div_element = document.createElement("div");
    div_element.setAttribute("id", "todoItem_" + itemCount);
    div_element.setAttribute("onClick", "crossOffItem(" + itemCount + ")");
    div_element.appendChild(document.createTextNode(todotext));
    document.getElementById("todo-list-item").appendChild(div_element);
    itemsArray.push(div_element.outerHTML);
    //button
    let button_element = document.createElement("i");
    button_element.setAttribute("id", "button_" + itemCount);
    button_element.setAttribute("onClick", "removeItemInVolatileMemory(" + itemCount + ")");
    button_element.setAttribute("class", "fa fa-remove");
    button_element.setAttribute("style", "font-size:48px;color:red");
    document.getElementById("todo-item-button").appendChild(button_element);
    document.getElementById("todoitem-input").value = " ";
    buttonsArray.push(button_element.outerHTML);
    itemCount = i++;
}

function removeItemInVolatileMemory(item) {
    console.log("removeItemInVolatileMemory " + item);
    document.getElementById("todo-list-item");
    document.getElementById("todo-item-button");
    // retrieve itewms from ls
    // find the item to remove based on todo texta
    // remove item from array
    // save array back into ls
    let buttontoremove = document.getElementById("button_" + item);
    let texttoremove = document.getElementById("todoItem_" + item);

    removeItemInLocalStorageArray(texttoremove.textContent);

    texttoremove.remove();
    buttontoremove.remove();
}

function addItemToLocalStorageArray(text) {
    console.log("addItemToLocalStorageArray " + text);

    const itemsArray = JSON.parse(localStorage.getItem("items")) || [];
    const todoItem = {
        text: text,
    };
    itemsArray.push(todoItem);
    localStorage.setItem("items", JSON.stringify(itemsArray));
}

function removeItemInLocalStorageArray(text) {
    console.log("removeItemInLocalStorageArray " + text);

    console.log("addItemToLocalStorageArray " + text);

    const itemsArray = JSON.parse(localStorage.getItem("items")) || [];
    const todoItem = {
        text: text,
    };
    let i = 0;
    itemsArray.forEach((item) => {
        if (item.text == text) {
            itemsArray.splice(i, 1);
        }
        i++;
    });
    localStorage.setItem("items", JSON.stringify(itemsArray));
}

function crossOffItem(item) {
    console.log("crossOffItem " + item);

    let todotext = document.getElementById("todoItem_" + item).innerText;
    let result = todotext.strike();
    document.getElementById("todoItem_" + item).innerHTML = result;
    addItemToLocalStorageArray(todotext);
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

function retreiveLocalStorage() {
    const data_items = JSON.parse(localStorage.getItem("items"));
    data_items.forEach((item) => {
        console.log(item.text);
        addItemToVolatileMemory(item.text);
    });
}

//All of these functions are bad.
function getItemId(item) {
    console.log("getItemID!");
    return item.slice(9, 19);
}
function getItemOnClick(item) {
    console.log("getItemOnClick!");
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
