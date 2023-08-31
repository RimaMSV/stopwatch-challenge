"use strict";

const resetBtnEl = document.querySelector(".reset");
const startBtnEl = document.querySelector(".start");
const stopBtnEl = document.querySelector(".stop");

const minutesEl = document.querySelector(".minute");
const secondsEl = document.querySelector(".second");
const centisecondEl = document.querySelector(".msec");

// Start condition
let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;
let min;
let centiSec;
let sec;

let isPlay = false;
let isReset = false;

// Play and Pause function

const start = () => {
  if (!isPlay && !isReset) {
    isPlay = true;
    isReset = true;
    startBtnEl.innerText = "Pause";

    centiSec = setInterval(() => {
      if (centiCounter === 100) {
        centiCounter = 0;
      }
      centisecondEl.innerHTML = `&nbsp;${centiCounter++}`;
    }, 10);

    sec = setInterval(() => {
      if (secCounter === 60) {
        secCounter = 0;
      }
      secondsEl.innerHTML = `&nbsp;${secCounter++} :`;
    }, 1000);

    min = setInterval(() => {
      minutesEl.innerHTML = `${minCounter++} :`;
    }, 60 * 1000); //
  } else {
    startBtnEl.textContent = "Start";
    clearInterval(centiSec);
    clearInterval(sec);
    clearInterval(min);
    isPlay = false;
    isReset = false;
  }
};

// Reset function
const reset = () => {
  minutesEl.innerHTML = "0 :";
  secondsEl.innerHTML = "&nbsp;0 :";
  centisecondEl.innerHTML = "&nbsp;00";
};

startBtnEl.addEventListener("click", start);
resetBtnEl.addEventListener("click", reset);

/*
const play = () => {
  if (!isPlay) {
    isPlay = true;
    startBtnEl.textContent = "Pause";
    centiSec = () =>
      setInterval(() => {
        centisecondEl.innerText = `${centiCounter++}`; //tens++;
      }, 10);

    sec = () =>
      setInterval(() => {
        secondsEl.innerText = `${secondCounter++} :`;
      }, 1000);
  } else {
    startBtnEl.innerHTML = "Start";
    clearInterval(sec);
    clearInterval(centiSec);
    isPlay = false;
  }
};

const reset = () => {
  play();
  secondsEl.innerHTML = "0 :";
  centisecondEl.innerHTML = "0";
};
*/
