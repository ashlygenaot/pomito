const bells = new Audio('./sounds/mixkit-achievement-bell-600 (2).wav');

const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const resetBtn = document.querySelector('.btn-reset');

const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
const totalPomodoros = document.querySelector('.stats');

let myInterval;
let state = true;
let totalSeconds;
let currentSessionType = 'pomodoro'; // Tracks current session type
let pomodoroCount = 0; // Tracks consecutive pomodoros

// Session durations (in minutes)
const sessionDurations = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
};

// Track and display pomodoro statistics
function updatePomodoroStats() {
    let stats = JSON.parse(localStorage.getItem("pomodoroStats")) || {
        pomodoros: 0,
        shortBreaks: 0,
        longBreaks: 0,
        totalSessions: 0,
        lastUpdated: new Date().toISOString()
    };
    
    totalPomodoros.innerHTML = `
        <span>Pomodoros: ${stats.pomodoros}</span> | 
        <span>Short Breaks: ${stats.shortBreaks}</span> | 
        <span>Long Breaks: ${stats.longBreaks}</span> | 
        <span>Total Sessions: ${stats.totalSessions}</span>
    `;
    
    return stats;
}

// Increment specific stat type
function incrementStat(type) {
    let stats = JSON.parse(localStorage.getItem("pomodoroStats")) || {
        pomodoros: 0,
        shortBreaks: 0,
        longBreaks: 0,
        totalSessions: 0,
        lastUpdated: new Date().toISOString()
    };
    
    if (type === 'pomodoro') {
        stats.pomodoros++;
    } else if (type === 'shortBreak') {
        stats.shortBreaks++;
    } else if (type === 'longBreak') {
        stats.longBreaks++;
    }
    
    stats.totalSessions++;
    stats.lastUpdated = new Date().toISOString();
    
    localStorage.setItem("pomodoroStats", JSON.stringify(stats));
    updatePomodoroStats();
}

// Get next session type based on current session
function getNextSession() {
    if (currentSessionType === 'pomodoro') {
        pomodoroCount++;
        
        // After 4 pomodoros, take a long break
        if (pomodoroCount >= 4) {
            pomodoroCount = 0;
            return 'longBreak';
        }
        // Otherwise, take a short break
        return 'shortBreak';
    } else {
        // After any break, return to pomodoro
        return 'pomodoro';
    }
}

// Update display with current session info
function updateSessionDisplay() {
    const sessionNames = {
        pomodoro: 'Focus Time',
        shortBreak: 'Short Break',
        longBreak: 'Long Break'
    };
    
    const sessionDisplay = document.querySelector('.session-type') || document.createElement('div');
    sessionDisplay.className = 'session-type';
    sessionDisplay.textContent = sessionNames[currentSessionType];
}

// Stores session duration
const updateSeconds = () => {
    const minutesLeft = Math.floor(totalSeconds/60);
    const secondsLeft = totalSeconds % 60;

    minuteDiv.textContent = `${minutesLeft}`;
    secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
};

// Start next session automatically
const startNextSession = () => {
    currentSessionType = getNextSession();
    totalSeconds = sessionDurations[currentSessionType] * 60;
    updateSessionDisplay();
    updateSeconds();
};

// Initializes timer
const appTimer = () => {
    if(!state) {
        alert('Session has already started.');
        return;
    }

    if (isNaN(totalSeconds) || totalSeconds === 0) {
        totalSeconds = sessionDurations[currentSessionType] * 60;
    }

    updateSeconds();
    updateSessionDisplay();
    state = false;

    myInterval = setInterval(() => {
        totalSeconds--;
        updateSeconds();

        if (totalSeconds <= 0) {
            clearInterval(myInterval);
            bells.play();
            state = true;
            
            // Increment stats when session completes
            incrementStat(currentSessionType);
            
            // Start next session
            startNextSession();
            
            return;
        }   
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
    totalSeconds = sessionDurations[currentSessionType] * 60;
    updateSeconds();
    state = true;
};

// Initializes button event listeners
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
startBtn.addEventListener('click', appTimer);

// Initialize on page load
updatePomodoroStats();
updateSessionDisplay();
totalSeconds = sessionDurations[currentSessionType] * 60;
updateSeconds();