let i = 1;
let itemsCount = 0;
let bLocalStorage;
let itemsArray = [];
let buttonsArray = [];

let input = document.getElementById("todoitem-input");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addItem();
    }
});

function addItem() {
    let todotext = document.getElementById("todoitem-input").value;
    if (todotext.length <= 1) {
        alert("Please gives yourself something to do!");
    } else if (todotext.length > 1) {
        const itemsArray = JSON.parse(localStorage.getItem("items")) || [];

        addItemToVolatileMemory(todotext, "addItem");
        addItemToLocalStorageArray(todotext);
    }
}

//----------------------------------------------------------- Volatile Memory -----------------------------------------------------------
function addItemToVolatileMemory(todotext, breadcrumb) {
    const itemsArray = JSON.parse(localStorage.getItem("items")) || [];

    if ("null" == itemsArray && breadcrumb == "retreiveLocalStorage") {
        itemsCount = itemsArray.length;
    } else if ("null" != itemsArray && breadcrumb == "addItem") {
        itemsCount == 0;
    }

    let div_element = document.createElement("div");
    div_element.setAttribute("id", "todoItem_" + itemsCount);
    div_element.setAttribute("onClick", "crossOffItemInVolatileMemory(" + itemsCount + ")");
    div_element.appendChild(document.createTextNode(todotext));
    document.getElementById("todo-list-item").appendChild(div_element);
    itemsArray.push(div_element.outerHTML);
    //button
    let button_element = document.createElement("i");
    button_element.setAttribute("id", "button_" + itemsCount);
    button_element.setAttribute("onClick", "removeItemInVolatileMemory(" + itemsCount + ")");
    button_element.setAttribute("class", "fa fa-remove");
    button_element.setAttribute("style", "font-size:48px;color:red");
    document.getElementById("todo-item-button").appendChild(button_element);
    document.getElementById("todoitem-input").value = "";
    buttonsArray.push(button_element.outerHTML);
    itemsCount = i++;
}

function removeItemInVolatileMemory(item) {
    document.getElementById("todo-list-item");
    document.getElementById("todo-item-button");
    let buttontoremove = document.getElementById("button_" + item);
    let texttoremove = document.getElementById("todoItem_" + item);
    removeItemInLocalStorageArray(texttoremove.textContent);
    texttoremove.remove();
    buttontoremove.remove();
}

function crossOffItemInVolatileMemory(item) {
    console.log("crossOffItemInVolatileMemory " + item);
    let todotext = document.getElementById("todoItem_" + item).innerText;
    let result = todotext.strike();
    document.getElementById("todoItem_" + item).innerHTML = result;
    crossOffItemInLocalStorage(item);
}

//----------------------------------------------------------- Local Storage -----------------------------------------------------------
function addItemToLocalStorageArray(text, itemCount) {
    const itemsArray = JSON.parse(localStorage.getItem("items")) || [];
    const todoItem = {
        id: itemCount,
        text: text,
        strike: 0,
    };
    itemsArray.push(todoItem);
    localStorage.setItem("items", JSON.stringify(itemsArray));
}

function removeItemInLocalStorageArray(text) {
    const itemsArray = JSON.parse(localStorage.getItem("items")) || [];
    let i = 0;
    itemsArray.forEach((item) => {
        if (item.text === text) {
            itemsArray.splice(i, 1);
        }
        i++;
    });
    localStorage.setItem("items", JSON.stringify(itemsArray));
}

function crossOffItemInLocalStorage(item) {
    const itemsArray = JSON.parse(localStorage.getItem("items")) || [];
    itemsArray[item].strike = 1;
    localStorage.setItem("items", JSON.stringify(itemsArray));
}

function retreiveLocalStorage() {
    const data_items = JSON.parse(localStorage.getItem("items"));
    data_items.forEach((item) => {
        console.log(item.text);
        addItemToVolatileMemory(item.text, "retreiveLocalStorage");
    });
}

//----------------------------------------------------------- Event Handling -----------------------------------------------------------
document.getElementById("saveLocalStorage").onclick = function () {
    bLocalStorage = true;
    localStorage.setItem("storage", bLocalStorage);
};

document.getElementById("noSave").onclick = function () {
    bLocalStorage = false;
    localStorage.setItem("storage", bLocalStorage);
    localStorage.clear();
};

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
