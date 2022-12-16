const splashScreen = document.querySelector("#splashScreen");
const videoSauce = document.querySelector("#vid");
const videoContainer = document.querySelector("#vidcon");
const score = document.querySelector("#score");
const runtime = document.querySelector("#runtime");
const tweet = document.querySelector("#tweet");

let _secondsPassed = 0;

function sendTweet() {
  // compose tweet send tweet with time and score.
  let currentScore = Number(score.innerHTML);
  let minutes = Math.floor(_secondsPassed / 60);
  let template = `https://twitter.com/intent/tweet?text=`;
  let composedTweet = `${template}i wasted ${minutes} minutes getting my silence broken by the kodok acimalaka ${currentScore} times 🐸 try for yourself on https://acimalaka.xxxxizzy.xyz 😩`;
  window.open(composedTweet, "_blank");
}

function stopwatch() {
  // Updates innerHTML with incremented value.
  _secondsPassed++;
  let output = new Date(_secondsPassed * 1000).toISOString().slice(11, 19);
  runtime.innerHTML = output;
}

function startStopwatch() {
  // Call stopwatch() at 1-second interval.
  setInterval(stopwatch, 1000);
}

function play() {
  videoSauce.play();
  videoContainer.classList.remove("disappear");
  let currentScore = Number(score.innerHTML);
  score.innerHTML = currentScore + 1;
  playAfter(90, 270);
}

function playAfter(minSeconds, maxSeconds) {
  let minIntervalMs = minSeconds * 1000;
  let maxIntervalMs = maxSeconds * 1000;
  let rando = Math.random() * maxIntervalMs;
  let interval = rando + minIntervalMs;
  setTimeout(play, interval);
}

function videoEnd() {
  videoContainer.classList.add("disappear");
}

videoSauce.addEventListener("ended", videoEnd);

function start() {
  // Show video element. Then hide splash screen.
  // Use disappear to fade, then hide.
  startStopwatch();
  //   setTimeout(hide, 1000);
  setTimeout(play, 1000);
}

function handleEnter(e) {
  if (e.keyCode === 13) {
    // e.preventDefault(); // Ensure it is only this code that runs
    start();
  }
}
