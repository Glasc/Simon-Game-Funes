const wrapper = document.querySelector('.wrapper');

const greenBtn = document.querySelector('.btn-green');
const redBtn = document.querySelector('.btn-red');
const yellowBtn = document.querySelector('.btn-yellow');
const blueBtn = document.querySelector('.btn-blue');
const buttons = [greenBtn, redBtn, yellowBtn, blueBtn];
const h1 = document.querySelector('h1');

let answer = [];
let userAnswer = [];
let round = 1;
let count = 0;
let playingGame = false;
removePointer();

const randomNumber = () => Math.floor(Math.random() * 4);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// starting round
const startRound = async () => {
  removePointer();
  const rNumber = randomNumber();
  answer.push(rNumber);
  buttons[rNumber].classList.add('animate');
  await sleep(600);
  buttons[rNumber].classList.remove('animate');
  await sleep(100);
  count++;
  if (count !== round) {
    startRound();
  } else {
    addPointer();
  }
}


// ------------events------------ //
let clickCount = 0;
buttons.forEach(currBtn => currBtn.addEventListener('click', (e) => {
  clickCount++;
  console.log('click detected.')
  for (let i = 0; i < 4; i++) {
    if (e.target === buttons[i]) {
      animateBtn(buttons[i]);
      userAnswer.push(i)
    }
  }



  if (userAnswer.length === answer.length) {
    if (userAnswer.toString() === answer.toString()) {
      round++;
      clearGame();
      printRound();
      removePointer();
      setTimeout(() => {
        startRound();
      }, 1200);
    } else {
      h1.innerHTML = `
        You lose B( .
        `;
      round = 1;
      clearGame();
      removePointer();
      setTimeout(() => {
        playingGame = false;
        h1.innerHTML = 'Press A Key To Start.'
      }, 2500)
    }
  } else if (userAnswer[clickCount - 1] !== answer[clickCount - 1]) {
    h1.innerHTML = `
    You lose B( .
    `;
    round = 1;
    clearGame();
    removePointer();
    setTimeout(() => {
      playingGame = false;
      h1.innerHTML = 'Press A Key To Start.'
    }, 2500)
  }
}
))

document.addEventListener('keyup', () => {
  if (!playingGame) {
    playingGame = true;
    printRound();
    startRound();
  }
})

// ------------utilities------------ //

function clearGame() {
  count = 0;
  userAnswer = [];
  answer = [];
  clickCount = 0;
}

function removePointer() {
  buttons.forEach(btn => {
    btn.classList.add('pointer-none');
  });
}

function addPointer() {
  buttons.forEach(btn => {
    btn.classList.remove('pointer-none')
  });
}

function animateBtn(btn) {
  btn.animate(
    [{
      border: '5px solid whitesmoke'
    }, ], {
      duration: 300
    }
  )
}

function printRound() {
  h1.innerHTML = `
  Round ${round}.
  `;
}