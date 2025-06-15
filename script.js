let workDuration = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;

let current = workDuration;
let interval = null;
let isRunning = false;
let session = "Work";

const timerElement = document.getElementById("timer");
const progressCircle = document.querySelector(".progress");
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

const setTimePanel = document.getElementById("set-time-panel");
const editTimeBtn = document.getElementById("edit-time-btn");

progressCircle.style.strokeDasharray = circumference;

function updateDisplay() {
  let totalSeconds = current;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Show hours only if at least 1 hour is set
  let timeString = "";
  if (hours > 0) {
    timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  timerElement.textContent = timeString;

  const offset = circumference - (current / getSessionDuration()) * circumference;
  progressCircle.style.strokeDashoffset = offset;

  // Dynamic color: green (start) -> yellow (middle) -> red (end)
  const percent = current / getSessionDuration();
  let r, g, b;
  if (percent > 0.5) {
    // Green to Yellow
    const t = (1 - percent) * 2;
    r = Math.round(0 + (255 - 0) * t);
    g = 255;
    b = Math.round(99 - 99 * t);
  } else {
    // Yellow to Red
    const t = 1 - percent * 2;
    r = 255;
    g = Math.round(255 - 255 * t);
    b = 0;
  }
  progressCircle.style.stroke = `rgb(${r},${g},${b})`;
}

function getSessionDuration() {
  if (session === "Work") return workDuration;
  if (session === "Short Break") return shortBreak;
  return longBreak;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    if (current === 0) {
      clearInterval(interval);
      isRunning = false;
      if (session === "Work") {
        session = "Short Break";
        current = shortBreak;
        alert("Work done! Time for a break.");
      } else if (session === "Short Break") {
        session = "Work";
        current = workDuration;
        alert("Break over! Back to work.");
      }
      updateDisplay();
      return;
    }
    current--;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  updateDisplay(); // ensure arc updates when paused
}

function resetTimer() {
  pauseTimer();
  session = "Work";
  current = workDuration;
  updateDisplay();
}

function toggleEditTime() {
  // Fill modal with current values
  document.getElementById('modal-work-hour').value = Math.floor(workDuration / 3600);
  document.getElementById('modal-work-min').value = Math.floor((workDuration % 3600) / 60);
  document.getElementById('modal-short-min').value = Math.floor(shortBreak / 60);
  document.getElementById('modal-long-min').value = Math.floor(longBreak / 60);
  document.getElementById('edit-time-modal').style.display = 'flex';
}

// Modal Set/Cancel handlers
document.getElementById('modal-set-btn').onclick = function() {
  const workHour = parseInt(document.getElementById('modal-work-hour').value) || 0;
  const workMin = parseInt(document.getElementById('modal-work-min').value) || 0;
  const shortMin = parseInt(document.getElementById('modal-short-min').value) || 1;
  const longMin = parseInt(document.getElementById('modal-long-min').value) || 1;
  if (workHour < 0 || workMin < 0 || workMin > 59 || (workHour === 0 && workMin === 0)) {
    alert('Invalid work time.');
    return;
  }
  if (shortMin < 1 || shortMin > 59) {
    alert('Invalid short break.');
    return;
  }
  if (longMin < 1 || longMin > 59) {
    alert('Invalid long break.');
    return;
  }
  workDuration = (workHour * 60 + workMin) * 60;
  shortBreak = shortMin * 60;
  longBreak = longMin * 60;
  if (session === "Work") current = workDuration;
  else if (session === "Short Break") current = shortBreak;
  else current = longBreak;
  updateDisplay();
  document.getElementById('edit-time-modal').style.display = 'none';
};
document.getElementById('modal-cancel-btn').onclick = function() {
  document.getElementById('edit-time-modal').style.display = 'none';
};

document.addEventListener("DOMContentLoaded", function() {
  updateDisplay();
});
