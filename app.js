/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*********************************
 * Global Variable Declarations
 */
var winningScore = 100;
var scores;
var roundScore;
var activePlayer;

/*******************************
 * Global Functions
 */
 function initializeGame() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  // Reset the DOM elements.
  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
 }

// rollDice returns an integer between 1 and max.
function rollDice(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Toggle to the next active player.
function ChangeActivePlayer() {
  UpdateRoundScore(0);
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  activePlayer ^= 1;
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
  document.querySelector('.dice').style.display = 'none';
}

// Update the round score for the active player
function UpdateRoundScore(score) {
  roundScore = score;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

/*********************************
 * Event Listeners
 */
// Set up an event handler for the dice roll button
document.querySelector('.btn-roll').addEventListener('click', event => {
  // If the game is currently being played, we will roll the dice and update the roundScore of the activePlayer.
  var dice = rollDice(6);

  // Display the result.
  var diceDOM = document.querySelector('.dice');
  diceDOM.src = 'dice-' + dice + '.png';
  diceDOM.style.display = 'block';

  // Update the roundScore if the roll was not a 1.
  if(dice !== 1) {
    UpdateRoundScore(roundScore + dice);
  } else {
    ChangeActivePlayer();
  }
});

// Event handler for the 'Hold' button.
document.querySelector('.btn-hold').addEventListener('click', event => {
  // Add the roundScore to the active player's total score.
  scores[activePlayer] += roundScore;
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  
  // Check to see if the active player won. If not, change players.
  if(scores[activePlayer] >= winningScore) {
    // Someone wins
    UpdateRoundScore(0);
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
  } else { 
    ChangeActivePlayer();
  }
  
});

document.querySelector('.btn-new').addEventListener('click', initializeGame);

// Init the game.
initializeGame();