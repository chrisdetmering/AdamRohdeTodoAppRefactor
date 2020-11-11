

let i = 1;
var itemCount;

function addItem(){

    itemCount = i++;

    console.log(itemCount);

    var todotext = document.getElementById('todoitem-input').value;

    if (todotext.length <= 1){

        alert("Please gives yourself something to do!");

    }else if (todotext.length > 1){

        console.log("button clicked");

        var div_element = document.createElement("div");
        div_element.setAttribute("id", "todoItem_" + itemCount);
        div_element.appendChild(document.createTextNode(todotext));
        document.getElementById('todo-item-list').appendChild(div_element);
    
        var button_element = document.createElement("button");
        button_element.setAttribute("id", "button_" + itemCount);
        button_element.setAttribute("onClick", "removeItem(" + itemCount + ")");
        button_element.appendChild(document.createTextNode("Complete"));
        document.getElementById('todo-item-button').appendChild(button_element);
       
    }

}


function removeItem(item){

    console.log("Button_ " + item + " Clicked");

};


