const bells = new Audio('./sounds/mixkit-achievement-bell-600 (2).wav');

const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const resetBtn = document.querySelector('.btn-reset');

const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
const sessionAmount = parseInt(minuteDiv.textContent); 

let myInterval;
let state = true;
let totalSeconds;

// Stores session duration
const updateSeconds = () => {
    const minutesLeft = Math.floor(totalSeconds/60);
    const secondsLeft = totalSeconds % 60;

    minuteDiv.textContent = `${minutesLeft}`;
    secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

};

// Initializes timer
const appTimer = () => {
    if(!state) {
        alert('Session has already started.');
        return;
}

if (isNaN(totalSeconds)) {
totalSeconds = sessionAmount * 60;
}

updateSeconds();

state = false;

myInterval= setInterval(() => {
    totalSeconds--;

    if (totalSeconds <= 0) {
        clearInterval(myInterval);
        bells.play();
        state = true;
        return;
    }   

    updateSeconds();
  }, 1000);
};

// Stops timer and ensures reset is possible
const stopTimer = () => {
    clearInterval(myInterval);
    state = true;
};

// Resets to original time
const resetTimer = () => {
    clearInterval(myInterval);
    totalSeconds = sessionAmount * 60;
    updateSeconds();
    state = true;
}

// Initializes button event listeners
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
startBtn.addEventListener('click', appTimer);