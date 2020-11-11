

let i = 1;
var itemCount;

function addItem(){
    itemCount = i++;
    //console.log(itemCount);
    var todotext = document.getElementById('todoitem-input').value;

    if (todotext.length <= 1){
        alert("Please gives yourself something to do!");
    }else if (todotext.length > 1){
        
        var div_element = document.createElement("div");
        div_element.setAttribute("id", "todoItem_" + itemCount);
        div_element.setAttribute("onClick", "crossOffItem(" + itemCount + ")");
        div_element.appendChild(document.createTextNode(todotext));
        document.getElementById('todo-list-item').appendChild(div_element);
       
        var button_element = document.createElement("i");
        button_element.setAttribute("id", "button_" + itemCount);
        button_element.setAttribute("onClick", "removeItem(" + itemCount + ")");
        button_element.setAttribute("class", "fa fa-remove");
        button_element.setAttribute("style", "font-size:48px;color:red");


        //button_element.appendChild(document.createTextNode("Remove"));
        document.getElementById('todo-item-button').appendChild(button_element);
        document.getElementById('todoitem-input').value = " ";
    }
}

function removeItem(item){
    var texttoremove = document.getElementById("button_" + item);
    var buttontoremove = document.getElementById("todoItem_" + item);
    console.log("Button_ " + item + " Clicked");
    texttoremove.remove();
    buttontoremove.remove();
};

function crossOffItem(item){
    var todotext = document.getElementById('todoItem_' + item).innerText;
    var result = todotext.strike();
    document.getElementById('todoItem_' + item).innerHTML = result;
    console.log(result);
    console.log("todoItem_" + item + " Clicked" + "Value= " + todotext);
};

//Handles the adding item when enter is pressed instead of the "Add" button
var input = document.getElementById('todoitem-input');
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        console.log("enter not ...clicked");

      // Cancel the default action, if needed
      event.preventDefault();
    console.log("enter  clicked");

      addItem();
    }
  });