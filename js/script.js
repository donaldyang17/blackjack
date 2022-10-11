let playerHand = [];
let playerSum = 0;
let playerValue = 0;
let playerAceCount = 0;

let dealerHand = [];
let dealerSum = 0;
let dealerValue = 0;
let dealerAceCount = 0;

let canHit = true;
let suits = "dsch";

let message = "";

let playerHandContainer = document.querySelector(".player-hand-container");
let dealerHandContainer = document.querySelector(".dealer-hand-container");
let end = document.querySelector(".end-message");

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function convertValue(drawNum) {
  if (drawNum > 10) {
    return 10;
  } else {
    return drawNum;
  }
}

window.onload = function () {
  loadPlayerHand();
  loadDealerHand();
};

function loadPlayerHand() {
  for (let i = 0; i < 2; i++) {
    playerDraw();
    document.getElementById("player-hand").innerHTML = `Player: ${playerSum}`;
  }
}

function playerDraw() {
  let drawNum = random(1, 13);
  let suit = suits[Math.floor(Math.random() * suits.length)];
  let sum = suit + drawNum;
  let playerValue = (playerSum += convertValue(drawNum));
  function playerAddAce() {
    if (drawNum === 1) {
      playerAceCount += 1;
      playerSum += 10;
    }
    if (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10;
      playerAceCount -= 1;
      return playerSum;
    }
  }
  playerAddAce();
  convertValue(drawNum);
  playerRenderCard(sum);
  playerHand.push(sum);
}

function playerRenderCard(sum) {
  let el = document.createElement("div");
  el.classList.add("card", sum);
  playerHandContainer.appendChild(el);
}

function dealerDraw() {
  let drawNum = random(1, 13);
  let suit = suits[Math.floor(Math.random() * suits.length)];
  let sum = suit + drawNum;
  let dealerValue = (dealerSum += convertValue(drawNum));
  function dealerAddAce() {
    if (drawNum === 1) {
      dealerAceCount += 1;
      dealerSum += 10;
    }
    if (dealerSum > 21 && dealerAceCount > 0) {
      dealerSum -= 10;
      dealerAceCount -= 1;
      console.log("aces work!");
      return dealerSum;
    }
  }
  dealerAddAce();
  convertValue(drawNum);
  dealerHand.push(sum);
  dealerRenderCard(sum);
}

function loadDealerHand() {
  for (let i = 0; i < 1; i++) {
    let drawNum = random(1, 13);
    let suit = suits[Math.floor(Math.random() * suits.length)];
    let sum = suit + drawNum;
    let dealerValue = (dealerSum += convertValue(drawNum));
    if (drawNum === 1) {
      dealerAceCount += 1;
      dealerSum += 10;
    }
    convertValue(drawNum);
    dealerHand.push(sum);
    dealerRenderCard("back-red");
  }
  let drawNum = random(1, 13);
  let suit = suits[Math.floor(Math.random() * suits.length)];
  let sum = suit + drawNum;
  let dealerValue = (dealerSum += convertValue(drawNum));
  if (drawNum === 1) {
    dealerAceCount += 1;
    dealerSum += 10;
  }
  convertValue(drawNum);
  dealerRenderCard(sum);
  document.getElementById(
    "dealer-hand"
  ).innerHTML = `Current Dealer Hand: ${convertValue(drawNum)}`;
}

function dealerRenderCard(sum) {
  let el = document.createElement("div");
  el.classList.add("card", sum);
  dealerHandContainer.appendChild(el);
}

document.getElementById("hit").addEventListener("click", hit);

function hit() {
  if (!canHit) {
    return;
  }
  playerDraw();
  if (playerSum === 21) {
    canHit = false;
  } else if (playerSum > 21) {
    endGame(end);
  }
  document.getElementById("player-hand").innerHTML = `Player: ${playerSum}`;
}

document.getElementById("stay").addEventListener("click", stay);

function stay() {
  canHit = false;
  endGame(end);
}

function endGame(end) {
  revealDealer();
  dealerTurn();
  let endText = document.querySelector(".end-message-text");
  end.classList.add("show");
  if (playerSum > 21) {
    message = `You have over 21. You Lose.`;
  } else if (dealerSum > 21) {
    message = `Dealer is over 21. You Win.`;
  } else if (playerSum < dealerSum) {
    message = `Dealer has ${dealerSum}. You Lose`;
  } else if (playerSum === dealerSum) {
    message = `Dealer has ${dealerSum}. Tie.`;
  } else if (playerSum > dealerSum) {
    message = `You have ${playerSum} over the dealer's ${dealerSum}. You Win!`;
  }
  document.getElementById(
    "dealer-hand"
  ).innerHTML = `Current Dealer Hand: ${dealerSum}`;
  let el = document.querySelector(".back-red");
  el.classList.remove("card", "back-red");
  endText.textContent = message;
}

function revealDealer() {
  let hidden = dealerHand.shift();
  dealerRenderCard(hidden);
}

//prettier-ignore
document.getElementById("restart-button").addEventListener("click", restartGame);

function restartGame() {
  window.location.reload();
}

function dealerTurn() {
  while (dealerSum < 17) {
    if (playerSum > 21) {
      break;
    }
    dealerDraw();
  }
}
