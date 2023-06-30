let todosContainerElement = document.getElementById("todoItemsContainer");
let onAddButtonElement = document.getElementById("onAddButton");
let saveButtonElement = document.getElementById("saveButton");

//getting todos list from local storage..............  8

function getTodosListfromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todosList = getTodosListfromLocalStorage();

let todosCount = todosList.length;

//save button local storage .............. 7
saveButtonElement.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todosList));
};

//onclick functions............... 3
function onTodoStatusChange(checkboxId, labelId, todoId) {
  let chechBoxEle = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);

  labelElement.classList.toggle("checked");

  // status checked and line through......
  let todoObjectIndex = todosList.findIndex(function (object) {
    let eachTodoId = "todo" + object.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  let todoObject = todosList[todoObjectIndex];
  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

function onDeleteTodo(todoId) {
  let todoItem = document.getElementById(todoId);
  todosContainerElement.removeChild(todoItem);

  //............item deleteion updation with splice method and findIndex() method
  let todoIndex = todosList.findIndex(function (eachTodo) {
    let todosIndex = "todo" + eachTodo.uniqueNo;
    if (todosIndex === todoId) {
      return true;
    } else {
      return false;
    }
  });
  todosList.splice(todoIndex, 1);
}

//creating todos...................  1

function createTodoElemets(todo) {
  let checkboxId = "checkBox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo_item_container");
  todoElement.id = todoId;

  todosContainerElement.appendChild(todoElement);

  let inputEle = document.createElement("input");
  inputEle.type = "checkbox";
  inputEle.id = checkboxId;
  inputEle.classList.add("check_box");
  inputEle.checked = todo.isChecked;
  inputEle.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todoId);
  };
  todoElement.appendChild(inputEle);

  let labelContainerElement = document.createElement("div");
  labelContainerElement.classList.add("label_container");
  todoElement.appendChild(labelContainerElement);

  let labelEle = document.createElement("label");
  labelEle.setAttribute("for", checkboxId);
  if (todo.isChecked === true) {
    labelEle.classList.add("checked");
  }
  labelEle.classList.add("label_element");
  labelEle.textContent = todo.text;
  labelEle.id = labelId;
  labelContainerElement.appendChild(labelEle);

  let deleteContainer = document.createElement("div");
  deleteContainer.classList.add("delete_continer");
  labelContainerElement.appendChild(deleteContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-trash3-fill", "delete_icon");
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };
  deleteContainer.appendChild(deleteIcon);
}

//..iteration on todos list...............  2

for (let todo of todosList) {
  createTodoElemets(todo);
}

// Adding new todo............ 5
function onAddTodoItem() {
  let userInputElement = document.getElementById("userInputElement");
  let userInput = userInputElement.value;
  if (userInput === "") {
    alert("enter valid value");
    return;
  }
  todosCount = todosCount + 1;
  let newTodo = {
    text: userInput,
    uniqueNo: todosCount,
    isChecked: false,
  };
  todosList.push(newTodo);
  createTodoElemets(newTodo);
  userInputElement.value = "";
}

//save button onclick event............. 4
onAddButtonElement.onclick = function () {
  onAddTodoItem();
};

/*....
1.creating single todo item.
2.creating multiple todo items.
3.taking user input and creating todos dynamically.
4.checking a todo.
5.deleting a todo.
6.persisting a todo o reload using local storage.
*/
