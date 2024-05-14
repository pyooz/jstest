const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock(); // 새로고침 하면 1초를 기다려야 하지만 이걸 넣음으로 바로 호출됨
setInterval(getClock, 1000); // 매초마다 실행

// padstart를 넣어 줌으로 01:01:01 이렇게 표시됨! 