let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const selection = Math.floor(Math.random() * 3 + 1);

  switch (selection) {
    case 1:
      return "Rock";
    case 2:
      return "Paper";
    case 3:
      return "Scissors";
  }
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();

  const rules = {
    rock: { beats: "scissors", losesTo: "paper" },
    paper: { beats: "rock", losesTo: "scissors" },
    scissors: { beats: "paper", losesTo: "rock" },
  };

  if (humanChoice === computerChoice) {
    return "Tie";
  }

  if (rules[humanChoice].beats === computerChoice) {
    humanScore++;
    return "Human";
  } else {
    computerScore++;
    return "Computer";
  }
}

function playGame() {
  const gameContainer = document.querySelector("#game-container");
  const resultContainer = document.querySelector("#result-container");
  const roundResults = document.querySelector("#round-results");
  const humanScoreElement = document.querySelector("#human-score");
  const computerScoreElement = document.querySelector("#computer-score");

  let round = 0;
  gameContainer.addEventListener("click", (event) => {
    if (round >= 5) return; // Stop after 5 rounds

    const humanSelection = event.target.id;
    const computerSelection = getComputerChoice();
    // Play round and update winner
    const winner = playRound(humanSelection, computerSelection);
    // Create new table row for this round
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${round + 1}</td>
      <td>${
        humanSelection.charAt(0).toUpperCase() + humanSelection.slice(1)
      }</td>
      <td>${computerSelection}</td>
      <td id="round-${round}-winner">${winner}</td>
    `;
    roundResults.appendChild(row);

    // Update scores
    humanScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;

    round++;

    if (round === 5) {
      const gameResult = document.createElement("p");
      if (humanScore > computerScore) {
        gameResult.textContent = "You win the game!";
      } else if (humanScore < computerScore) {
        gameResult.textContent = "You lose the game!";
      } else {
        gameResult.textContent = "It's a tie!";
      }
      resultContainer.appendChild(gameResult);
    }
  });
}
playGame();

// Reset Game
const resetButton = document.querySelector("#reset-button");

resetButton.addEventListener("click", () => {
  document.location.reload();
});
