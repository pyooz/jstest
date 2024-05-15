const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  // toDos DB에서 todo를 지운 뒤
  saveToDos(); // 한 번 더 불러와야 함
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text; // paintTodo는 text를 받았지만 이제는 object를 받음 그래서 newTodo에 .text를 붙여 줌!
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault(); // 새로고침 하지 않게
  const newTodo = toDoInput.value;
  // input의 value를 새로운 변수에 복사 (newTodo에 저장하는 역할)
  toDoInput.value = "";
  // 칸을 비워 주는 역할, newTodo의 값이 사라지는 것이 아님
  const newTodoObj = {
    text: newTodo,
    id: Date.now()
    // 완전한 랜덤은 아니지만 값을 랜덤으로 부여하기에 적합
    // id로 각각의 li item을 구별하고 싶음
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj); // string으로 주는 것 대신 newTodoObj를 줌
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo); // arrow function
  /* 이해하기!! 중요!
  forEach 함수는 이 paintToDo를 parsedToDos 배열의 요소마다 실행됨
  forEach는 각각의 item을 줌. item이 object가 됨 */
}