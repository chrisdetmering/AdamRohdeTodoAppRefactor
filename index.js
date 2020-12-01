

document.addEventListener('keypress', event => { 
    if (event.key === 'Enter') { 
        addTodo();
    }
})


function addTodo() {
    const todo = { 
        id: Math.random(), 
        text: document.getElementById("todo-text-input").value, 
        isCompleted: false
    }
    
    if (todo.text.length <= 1) {
        alert("Please gives yourself something to do!");
    } 
       
    renderTodo(todo);

    saveTodo(todo); 
    document.getElementById("todo-text-input").value = "";
}

function renderTodo(todo) {
   
    createTodo(todo)
}


function createTodo(todo) { 
    let todoListItem = document.createElement("li");
    let todoText = document.createElement("p");
    let deleteButton = createDeleteButton(todo); 


    todoText.addEventListener('click', () => { 
        todo.isCompleted = !todo.isCompleted
        console.log('isCompleted toggle', todo.isCompleted);
        if (todo.isCompleted) { 
            todoListItem.className = 'strike-through'
        } else { 
            todoListItem.className = ''
        }
    })

    todoListItem.setAttribute("id", todo.id);
    todoText.textContent = todo.text; 
    
    todoListItem.appendChild(todoText);
    todoListItem.appendChild(deleteButton);
    document.getElementById("todo-list").appendChild(todoListItem);
}


function createDeleteButton(todo) { 
     let deleteButton = document.createElement("i");

    deleteButton.setAttribute("class", "fa fa-remove");
    deleteButton.setAttribute("style", "font-size:48px;color:red");

    deleteButton.addEventListener('click', () => { 
        deleteButton.parentElement.remove(); 
        deleteTodo(todo);
    })
    
    return deleteButton; 
}



function saveTodo(todo) {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function deleteTodo(todo) {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTodos = savedTodos.filter(savedTodo => savedTodo.id !== todo.id); 
    localStorage.setItem("todos", JSON.stringify(newTodos));
}

function crossOffItemInLocalStorage(item) {
   
}

function getSavedTodos() {
    console.log('getting saved todos');
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todo => {
        renderTodo(todo);
    });
}


document.getElementById("save").addEventListener('click', () => { 
    localStorage.setItem("isSaved", true);
})

document.getElementById("no-save").addEventListener('click', () => { 
    localStorage.setItem("isSaved", false);
})


window.onload = function () {
    let isSaved = JSON.parse(localStorage.getItem("isSaved"));

    console.log('isSaved', isSaved);
    if (isSaved) { 
        document.getElementById("save").checked = true;
        document.getElementById("no-save").checked = false;
        getSavedTodos()
        return;
    } 

    document.getElementById("save").checked = false;
    document.getElementById("no-save").checked = true;
};
