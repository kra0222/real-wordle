const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const keyboardDown = (event) => {
    const key = event.target.dataset.key;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (key === "BACKSPACE") {
      handleBackspace();
    } else if (key === "ENTER") {
      handleEnterKey();
    } else if (key >= "A" && key <= "Z") {
      thisBlock.innerText = key;
      index++;
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = `게임이 종료되었습니다!!\n 정답: ${정답}`;
    div.classList.add("overgame");
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    attempts++;
    if (attempts === 6) return gameover();
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "green";
        block.classList.add("moving_big");
      } else if (정답.includes(입력한_글자)) block.style.background = "yellow";
      else {
        block.style.background = "grey";
        block.classList.add("moving_shake");
      }
      block.style.color = "white";

      const keyBlock = document.querySelector(
        `.key-block[data-key='${입력한_글자}']`
      );
      if (입력한_글자 === 정답_글자) {
        keyBlock.style.background = "green";
      } else if (정답.includes(입력한_글자))
        keyBlock.style.background = "yellow";
    }

    if (맞은_개수 === 5) gameover();
    else nextLine();
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const time = document.querySelector(".time");
      time.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handlekeydown);

  const keyboard = document.querySelectorAll(".key-block");
  for (let j = 0; j < keyboard.length; j++) {
    keyboard[j].addEventListener("click", keyboardDown);
  }
}

appStart();
