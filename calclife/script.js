// DOM Elements - Selecting elements from our HTML
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusText = document.getElementById('status-text');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const container = document.querySelector('.container');
const pomodoroRadio = document.querySelector('input[value="pomodoro"]');
const breakRadio = document.querySelector('input[value="break"]');

// Timer variables
let timerInterval = null;  // Will hold our interval
let minutes = 25;          // Default start time (25 minutes)
let seconds = 0;
let isRunning = false;     // Track if timer is currently running

// Initialize display
updateTimerDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
pomodoroRadio.addEventListener('change', switchToWorkMode);
breakRadio.addEventListener('change', switchToBreakMode);

// Function to update the timer display
function updateTimerDisplay() {
    // Format the minutes and seconds to always show two digits
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

// Function to start the timer
function startTimer() {
    if (isRunning) return; // Don't start again if already running
    
    isRunning = true;
    statusText.textContent = pomodoroRadio.checked ? 'Focus time!' : 'Break time!';
    
    // Disable start button while running
    startButton.disabled = true;
    
    // Start the interval, running once per second (1000ms)
    timerInterval = setInterval(function() {
        // If seconds are at 0, we need to reduce a minute
        if (seconds === 0) {
            if (minutes === 0) {
                // Timer is done!
                finishTimer();
                return;
            }
            // Reduce minute and set seconds to 59
            minutes--;
            seconds = 59;
        } else {
            // Just reduce seconds
            seconds--;
        }
        
        // Update the display with new values
        updateTimerDisplay();
    }, 1000);
}
// Function to pause the timer
function pauseTimer() {
    if (!isRunning) return; // Can't pause if not running
    
    isRunning = false;
    clearInterval(timerInterval);
    statusText.textContent = 'Timer paused';
    startButton.disabled = false;
}

// Function to reset the timer
function resetTimer() {
    // Stop any running timer
    pauseTimer();
    
    // Reset time based on selected mode
    if (pomodoroRadio.checked) {
        minutes = 25;
    } else {
        minutes = 5;
    }
    seconds = 0;
    
    // Update display and status
    updateTimerDisplay();
    statusText.textContent = 'Ready to start!';
    startButton.disabled = false;
}

// Function for when timer finishes
function finishTimer() {
    pauseTimer();
    
    // Create audio alert
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3');
    audio.play();
    
    if (pomodoroRadio.checked) {
        statusText.textContent = 'Work session complete! Take a break!';
        breakRadio.checked = true;
        switchToBreakMode();
    } else {
        statusText.textContent = 'Break complete! Ready for another work session?';
        pomodoroRadio.checked = true;
        switchToWorkMode();
    }
}

// Function to switch to work mode
function switchToWorkMode() {
    container.classList.remove('break-mode');
    container.classList.add('work-mode');
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
    statusText.textContent = 'Ready to focus!';
    pauseTimer();
}

// Function to switch to break mode
function switchToBreakMode() {
    container.classList.remove('work-mode');
    container.classList.add('break-mode');
    minutes = 5;
    seconds = 0;
    updateTimerDisplay();
    statusText.textContent = 'Ready for a break!';
    pauseTimer();
}

// Initial mode setting
switchToWorkMode();

// Leverage event-delegation via bubbling
document.addEventListener( "click", function toggleWords ( event ) {
    // A few variables to help us track important values/references
    var target = event.target, values = [], placed;
    // If the clicked element has multiple values
    if ( target.hasAttribute( "data-values" ) ) {
        // Split those values out into an array
        values = target.getAttribute( "data-values" ).split( "," );
        // Find the location of its current value in the array
        // IE9+ (Older versions supported by polyfill: http://goo.gl/uZslmo)
        placed = values.indexOf( target.textContent );
        // Set its text to be the next value in the array
        target.textContent = values[ ++placed % values.length ];   
    }
});