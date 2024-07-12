const resultDisplay = document.querySelector('#result')
const choicesDisplay = document.querySelector('#choices')
const playerScoreDisplay = document.querySelector('#player-score')
const computerScoreDisplay = document.querySelector('#computer-score')

const choices = ['rock', 'paper', 'scissors']
const choiceImages = {
  rock: 'images/rock.svg',
  paper: 'images/paper.svg',
  scissors: 'images/scissor.svg'
}

let playerScore = 0
let computerScore = 0

const handleClick = (e) => {
  const userChoice = e.target.alt
  const computerChoice = choices[Math.floor(Math.random() * choices.length)]
  getResults(userChoice, computerChoice)
}

choices.forEach(choice => {
  const button = document.createElement('img')
  button.src = choiceImages[choice]
  button.alt = choice
  button.addEventListener('click', handleClick)
  choicesDisplay.appendChild(button)
})
 
const getResults = (userChoice, computerChoice) => {
  let result = ''

  switch (userChoice + computerChoice) {
    case 'scissorspaper':
    case 'rockscissors':
    case 'paperrock':
      result = 'Your Choice: ' + userChoice + "<br />" + 'Computer\'s Choice: ' + computerChoice + "<br />" + "<br />" + 'YOU WIN!'
      playerScore++
      break
    case 'paperscissors':
    case 'scissorsrock':
    case 'rockpaper':
      result = 'Your Choice: ' + userChoice + "<br />" + 'Computer\'s Choice: ' + computerChoice + "<br />" + "<br />" + 'YOU LOSE!'
      computerScore++
      break
    case 'scissorsscissors':
    case 'rockrock':
    case 'paperpaper':
      result = 'Your Choice: ' + userChoice + "<br />" + 'Computer\'s Choice: ' + computerChoice + "<br />" + "<br />" + 'IT\'S A DRAW!'
      break
  }
  resultDisplay.innerHTML = result
  playerScoreDisplay.innerHTML = playerScore
  computerScoreDisplay.innerHTML = computerScore
}
