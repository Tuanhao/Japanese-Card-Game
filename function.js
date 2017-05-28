var engArray = ["Apple", "Bus", "Teacher", "Juice"]
var japArray = ["アップル", "バス", "先生", "ジュース"]
var openedCards = []
var successValue = 0

/** Filled up card with word */
function cardFilling() {
  var cards = document.getElementsByClassName('card')
  for (var i = 0; i < 4; i++) {
    var engContent = document.createElement("div")
    var japContent = document.createElement("div")
    engContent.innerHTML = engArray[i]
    japContent.innerHTML = japArray[i]
    cards[i].append(engContent)
    cards[i+5].append(japContent)
  }
}
cardFilling()

/** Checking for two opening cards */
function cardCheck() {
  var firstCard = openedCards[0].getElementsByTagName("div")[0].innerHTML
  var secondCard = openedCards[1].getElementsByTagName("div")[0].innerHTML
  if (engArray.indexOf(firstCard) == japArray.indexOf(secondCard) && japArray.indexOf(secondCard) > -1) {
    openedCards[0].style.pointerEvents = "none"
    openedCards[1].style.pointerEvents = "none"
    successValue++
  }
  else if (japArray.indexOf(firstCard) == engArray.indexOf(secondCard) && engArray.indexOf(secondCard) > -1 ) {
    openedCards[0].style.pointerEvents = "none"
    openedCards[1].style.pointerEvents = "none"
    successValue++
  } else { // cards dont match so close card and also disable mouse on whole website
    document.getElementsByTagName('body')[0].style.pointerEvents = "none"
    var closingCards = openedCards;
    setTimeout(function(){
      closeCard(closingCards)
      document.getElementsByTagName('body')[0].style.pointerEvents = "auto"
    }, 1750)
  }
  openedCards = []; // cleaned array after checked
}

/**  Make cards rotate when clicked */
function cardRotation(card) {
  flipCard(card) // call flip card for first click
  if(successValue == engArray.length) {
    win()
  }
  openedCards.push(card)
  if (openedCards.length % 2 == 0) { // 2 cards are opened so do a check
    cardCheck()
  }
}

function flipCard(card) {
  card.style.animation = "flipCard 1.25s linear"
  card.style.animationFillMode = "forwards"
  //card.style.pointerEvents = "none"
}

function closeCard(cards) {
  cards[0].style.animation = "closeCard 1.25s linear"
  cards[1].style.animation = "closeCard 1.25s linear"
}

/** win function by showing an gif */
function win() {
  document.getElementsByClassName("container")[0].style.display = "none"
  document.getElementById("winningPage").style.display = "block"
}
