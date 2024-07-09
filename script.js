// script.js

let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

startStopButton.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopButton.textContent = 'Stop';
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startStopButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapTimes.innerHTML = '';
});

lapButton.addEventListener('click', function() {
    if (running) {
        const li = document.createElement('li');
        li.textContent = display.textContent;
        lapTimes.appendChild(li);
    }
});

function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    display.textContent = hours + ':' + minutes + ':' + seconds;
}
