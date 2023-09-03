"use strict";

const resetBtnEl = document.querySelector(".reset");
const startBtnEl = document.querySelector(".start");
const lapBtnEl = document.querySelector(".lap");
const lapListEl = document.querySelector(".lap-list");
const stopWatchEl = document.querySelector(".stopwatch");
const stopWatchFrameColorEl = document.querySelector(".outer-circle");

let startTime;
let stopwatchInterval;
let elapsedPausedTime = 0;
let isRunning = false;
let laps = [];
let elapsedTime = [];

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startBtnEl.textContent = "Pause";

    startTime = new Date().getTime() - elapsedPausedTime;
    stopwatchInterval = setInterval(renderStopWatch, 100);
    stopWatchFrameColorEl.classList.add("animation-frame");
  } else {
    pauseStopwatch();
    stopWatchFrameColorEl.classList.remove("animation-frame");
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    startBtnEl.textContent = "Start";
    clearInterval(stopwatchInterval);
    elapsedPausedTime = new Date().getTime() - startTime;
  }
}

function renderStopWatch() {
  elapsedTime = new Date().getTime() - startTime;
  let displayTime = returnTimeAsText(elapsedTime);
  stopWatchEl.innerHTML = displayTime;
}

function returnTimeAsText(elapsedTime) {
  let milliseconds = elapsedTime % 1000;
  let seconds = Math.floor(elapsedTime / 1000) % 60;
  let minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  let hours = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;

  return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(
    2,
    0
  )}:${String(seconds).padStart(2, 0)}:${String(milliseconds).padStart(3, 0)}`;
}

function resetStopwatch() {
  pauseStopwatch();
  pauseStopwatch();
  stopWatchFrameColorEl.classList.remove("animation-frame");
  elapsedPausedTime = 0;
  stopWatchEl.innerHTML = "00:00:00:000";
  lapListEl.innerHTML = "";
  laps = [];
}

function createLaps() {
  if (isRunning) {
    let lap = {};
    lap.time = new Date().getTime() - startTime;
    lap.text = returnTimeAsText(lap.time);

    laps.push(lap);
  }

  console.log(laps);
  renderLaps();
}

function renderLaps() {
  let lapLi = "";

  if (laps.length > 0) {
    laps.forEach(function (lap, lapIndex) {
      lapLi += `<li class="lap-item">
              <span class="lap-number">#${lapIndex + 1}</span>
              <span class="time-stamp">${lap.text}</span>
              <span class="record-comparison">${
                lapIndex == 0
                  ? calcLapDiff(0, lap.time)
                  : calcLapDiff(laps[lapIndex - 1].time, lap.time)
              }</span>
            </li>`;
    });
  } else {
    console.log("There are no laps");
  }

  lapListEl.innerHTML = lapLi;
}

function calcLapDiff(t1, t2) {
  const diff = t2 - t1;
  let milliseconds = diff % 1000;
  let seconds = Math.floor(diff / 1000) % 60;
  let minutes = Math.floor(diff / 1000 / 60) % 60;
  let hours = Math.floor(diff / 1000 / 60 / 60) % 24;

  return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(
    2,
    0
  )}:${String(seconds).padStart(2, 0)}:${String(milliseconds).padStart(3, 0)}`;
}

startBtnEl.addEventListener("click", startStopwatch);
lapBtnEl.addEventListener("click", createLaps);
resetBtnEl.addEventListener("click", resetStopwatch);
