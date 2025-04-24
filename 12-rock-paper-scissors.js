let score = (JSON.parse(localStorage.getItem('score'))) || {
  Wins: 0,
  Loses: 0,
  Ties: 0
};

updateScoreElement();
/*
if (score === null) {
  score = {
    Wins: 0,
    Loses: 0,
    Ties: 0
  };
}
*/

let isAutoplaying = false;
let intervalId;//the id is created outside the fctn to ensure consistency of the id.

document.querySelector('.js-auto-play-button').
 addEventListener('click', () => {autoPlay()});//Here you might want to place the fctn before the round brackets to run but it won't work.The fctn to be run has to appeat btwn the curly brackets.

function autoPlay() {
  if(!isAutoplaying) {
    intervalId = setInterval(() => {
      const yourMove = pickComputerMove();
      playGame(yourMove)}, 1000);
      isAutoplaying = true;//we set it back to true b'coz we can't let isAutoplaying to always be false & also it gives sense to the else statement.
  } else {
    //to stop the autoplay,we have to stop the fctn by creating an id on it.We create it on the outside of the fctn b'coz when we create it on the inside,a new id will be created everytime when the fctn runs.Now to stop the interval,we use the fctn clearInterval(); and within the brackets, give it the id created.
    clearInterval(intervalId);
    isAutoplaying = false;
  }
  
}

const buttonElement1 = document.querySelector('.js-rock-button');
 buttonElement1.addEventListener('click', () => {
  playGame('Rock');
});

document.body.addEventListener('keydown', (event)/*event.key comes with a parameter*/ => {
  if(event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
})

const buttonElement2 = document.querySelector('.js-paper-button');
 buttonElement2.addEventListener('click', (event) => {
  playGame('Paper');
})

/*
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'p') {
    playGame('Paper');
  }
})
*/

const buttonElement3 = document.querySelector('.js-scissors-button');
 buttonElement3.addEventListener('click', () => {
  playGame('Scissors');
})

/*
document.body.addEventListener('keydown', () => {
  if(event.key === 's') {
    playGame('Scissors');
  }
})
*/

function playGame(yourMove) {

  const computerMove = pickComputerMove();
  
  let result = '';
  
  if (yourMove === 'Scissors') {
      if (computerMove === 'Rock') {
      result = 'You Lose';
    } else if (computerMove === 'Paper') {
      result = 'You Win';
    } else if (computerMove === 'Scissors') {
      result = 'Its a Tie';
    }
  } else if (yourMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You Win';
    } else if (computerMove === 'Paper') {
      result = 'Its a Tie';
    } else if (computerMove === 'Scissors') {
      result = 'You Lose';
    }
  } else if (yourMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Its a Tie';
    } else if (computerMove === 'Paper') {
      result = 'You Lose';
    } else if (computerMove === 'Scissors') {
      result = 'You Win';
    }
  }
   
  if (result === 'You Win') {
    score.Wins += 1;
  } else if (result === 'You Lose') {
    score.Loses += 1;
  } else if (result === 'Its a Tie') {
    score.Ties += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = result;
  
  document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${yourMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;
}

document.querySelector('.js-reset-score-button').
 addEventListener('click', () => {
  updateScoreElement()
 });
 
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses}, Ties: ${score.Ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove  = 'Paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
}
