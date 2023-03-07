const racers = [
  {
    name: "malfoy",
    raceNumber: "1",
    speed: 13,
    raceColor: "lightblue",
    icon: "./icons8-draco-malfoy-48.png",
  },
  {
    name: "dobby",
    raceNumber: "2",
    speed: 34,
    raceColor: "lightgreen",
    icon: "./icons8-dobby-48.png",
  },
  {
    name: "hermione",
    raceNumber: "3",
    speed: 10,
    raceColor: "pink",
    icon: "./icons8-hermione-48.png",
  },
  {
    name: "dumbledore",
    speed: 20,
    raceNumber: "4",
    raceColor: "gold",
    icon: "./icons8-albus-dumbledore-48.png",
  },
];

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", startRace);

const stopButton = document.querySelector("#stop-button");
stopButton.addEventListener("click", stopAll);

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", reset);

function reset() {
  stopAll();
  let clear = document.querySelectorAll("p");
  clear.forEach((e) => {
    e.remove();
  });
  racers.forEach((element) => {
    let icon = document.querySelector(`#${element.id}`);
    icon.style.left = 0;
    console.log(icon);
  });
}

function createRaceDivs() {
  racers.forEach((element) => {
    let newDiv = document.createElement("div");
    newDiv.className = `race${element.raceNumber}`;
    newDiv.style.background = element.raceColor;
    newDiv.addEventListener("click", stopSingle);

    element.id = `runner${element.raceNumber}`;

    newDiv.append(createImg(element));
    document.body.appendChild(newDiv);
  });
}

function startRace() {
  racers.forEach((element) => {
    let intervalId = setInterval(() => {
      moveIcon(element);
    }, element.speed);

    element.intervalId = intervalId;
  });
}

function createImg(racer) {
  let img = document.createElement("img");
  img.src = racer.icon;
  img.height = 50;
  img.width = 50;
  img.id = racer.id;
  img.left = 0;
  return img;
}

function announceWinner(winner) {
  let theWinner = document.createElement("p");
  theWinner.textContent = `the winner is ${winner}!`;
  document.body.appendChild(theWinner);
}

function averageSpeed(divLength, racerSpeed) {
  let avSpeed = document.createElement("p");
  avSpeed.textContent = `the average speed is ${divLength / racerSpeed}!`;
  document.body.appendChild(avSpeed);
}

function moveIcon(element) {
  let img = document.querySelector(`#${element.id}`);
  if (img.offsetLeft >= img.parentElement.clientWidth - img.clientWidth) {
    announceWinner(element.name);
    averageSpeed(document.querySelector(".race1").clientWidth, element.speed);
    stopAll();
  } else {
    img.style.left = img.offsetLeft + 10 + "px";
  }
}

function stopAll() {
  racers.forEach((element) => {
    clearInterval(element.intervalId);
  });
}

function stopSingle(event) {
  let stopRacer = event.target.className;
  console.log(racers);
  clearInterval(stopRacer.slice(-1));
}

createRaceDivs();
