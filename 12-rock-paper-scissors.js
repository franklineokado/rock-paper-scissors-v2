const trackResults = JSON.parse(localStorage.getItem('trackResults')) || {
  Wins: 0,
  Loses: 0,
  Ties: 0
};

let autoPlaying = false
let timeoutId;

function autoPlay() {
  if (!autoPlaying) {
     timeoutId = setInterval(function() {
      const myMove = getComputerMove()//Here, the variable myMove is set to the function getComputerMove(). Remember that the game is to be set to play automatically. So the function getComputerMove() which gets the computer move has to be set to myMove.
  
      getResult(myMove)
    }, 1000)

    autoPlaying = true
  } else {
    clearInterval(timeoutId);
    autoPlaying = false;
  }
}

function getResult(myMove) {
  const computerMove = getComputerMove()

  let result;

  if (computerMove === 'rock') {
    if (myMove === 'rock') {
      result = 'Its a Tie'
    } else if (myMove === 'paper') {
      result = 'You Win'
    } else if (myMove === 'scissors') {
      result = 'You Lose'
    }
  } else if (computerMove === 'paper') {
    if (myMove === 'rock') {
      result = 'You Lose'
    } else if (myMove === 'paper') {
      result = 'Its a Tie'
    } else if (myMove === 'scissors') {
      result = 'You Win'
    }
  } else if (computerMove === 'scissors') {
    if (myMove === 'rock') {
      result = 'You Win'
    } else if (myMove === 'paper') {
      result = 'You Lose'
    } else if (myMove === 'scissors') {
      result = 'Its a Tie'
    }
  }

  if (result === 'You Win') {
    trackResults.Wins ++; 
  } else if (result === 'You Lose') {
    trackResults.Loses ++;
  } else if (result === 'Its a Tie') {
    trackResults.Ties ++;
  };

  localStorage.setItem('trackResults', JSON.stringify(trackResults));

  document.querySelector('.js-results-statement').innerHTML = `You picked <span><img src="${myMove}-emoji.png" class="images"></span> Computer picked <span><img src="${computerMove}-emoji.png" class="images"></span> <span class="results-text"><br><br>${result}.</span>` 

  document.querySelector('.js-score-statement').innerHTML = `Wins: ${trackResults.Wins}, Loses: ${trackResults.Loses}, Ties: ${trackResults.Ties}`;
};


let computerMove = '';

function getComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber > 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber > 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber > 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  };
  return computerMove
};

