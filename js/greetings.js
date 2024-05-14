const loginForm = document.querySelector("#login-form")
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
// 관습: string만 포함된 변수는 대문자로 쓴다 + 중요한 변수가 아니라서
const USERNAME_KEY = "username";
// 반복해서 사용하니 오타가 나면 쉽게 알기 위해 변수 지정

function onLoginSubmit(event) {
  event.preventDefault(); // 화면 새로고침 방지
  loginForm.classList.add(HIDDEN_CLASSNAME); // form 다시 숨겨 줌
  const username = loginInput.value; // value를 username이라는 key 값으로 저장
  localStorage.setItem(USERNAME_KEY, username); // username값을 username이라는 key와 함께 local storage에 저장
  paintGreetings(username); // onLoginSubmit 함수에서는 유저 정보가 input으로부터 옴
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
// 비어있는 h1 요소 안에 `hello username`이라는 텍스트 추가

const savedUsername = localStorage.getItem(USERNAME_KEY);
// 앱이 시작되면 local storage에서 savedusername을 얻으려고 할텐데 거기서 username이라는 key를 가지고 찾게 됨

// 처음에는 key랑 value가 null이므로
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  // // form에 hidden을 지워주고
  loginForm.addEventListener("submit", onLoginSubmit);
  // // form이 submit될 때만 onLoginSubmit 함수를 실행시키도록 함
} else {
  paintGreetings(savedUsername);
  // 유저정보가 localstoreage에서 나오고 있다
  // paintGreeting은 only localstoarage에서만 값을 불러온다
}
