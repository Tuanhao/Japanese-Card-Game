var engArray = ["Apple", "Bus", "Teacher", "Juice", "Cat", "Airplane", "Blue", "Plate", "honesty" , "equality" , "First place",
"Action", "Hapiness", "Earth", "Secret", "City", "Emotion", "Crime", "Anxiety", "Nature"]
var japArray = ["りんご", "バス", "先生", "ジュース", "ねこ", "ひこうき", "あおい", "おさら", "しょうじき" , "びょうどう", "いちばん",
"こうどう", "こうふく", "ちきゅう", "ひみつ", "とし", "かんじょう", "はんざい", "ふあん", "しぜん"]
var cardLocation = []
var wordsChoosingArray = []
var wordsArray = []
var openedCards = []
var successValue = 0

wordsChoosing()
locationGenerator()
cardFilling()

/** Create an array with 8 random numbers within engArray vs japArray length */
function wordsChoosing() {
  var randomNum = Math.floor(Math.random() * 21)
  if (wordsChoosingArray.length == 8) {
    wordsArrayFilling()
    return
  } else if (wordsChoosingArray.indexOf(randomNum) == -1) {
    wordsChoosingArray.push(randomNum)
  }
  wordsChoosing()
}

function wordsArrayFilling() {
  for (var i = 0; i < 8; i++) {
    wordsArray.push(engArray[wordsChoosingArray[i]])
    wordsArray.push(japArray[wordsChoosingArray[i]])
  }
}

/** Generate an array with max 15 and min 0 (1 number can only appears once) */
function locationGenerator() {
  var randomNum = Math.floor(Math.random() * 16)
  if (cardLocation.indexOf(randomNum) == -1) {
    cardLocation.push(randomNum)
  } else if (cardLocation.length == 16) {
    return
  }
  locationGenerator()
}

/** Filled up card with word */
function cardFilling() {
  var cards = document.getElementsByClassName('card')
  for (var i = 0; i < 16; i++) {
    var cardContent = document.createElement("div")
    cardContent.setAttribute("style","display: table-cell; vertical-align: middle;")
    cardContent.innerHTML = wordsArray[i]
    cards[cardLocation[i]].append(cardContent)
  }
}

/**
  Checking for two opening cards
  if cards are matched then increase successValue
  if not close cards and enable click-ability
*/
function cardCheck() {
  var firstCard = openedCards[0].getElementsByTagName("div")[0].innerHTML
  var secondCard = openedCards[1].getElementsByTagName("div")[0].innerHTML
  if (engArray.indexOf(firstCard) == japArray.indexOf(secondCard) && japArray.indexOf(secondCard) > -1) {
    successValue++
  }
  else if (japArray.indexOf(firstCard) == engArray.indexOf(secondCard) && engArray.indexOf(secondCard) > -1 ) {
    successValue++
  } else { // cards dont match so close card and also disable mouse on whole page
    document.getElementsByTagName('body')[0].style.pointerEvents = "none"
    var closingCards = openedCards;
    setTimeout(function(){ // after card close, enable cards and page clickable
      document.getElementsByTagName('body')[0].style.pointerEvents = "auto"
      closingCards[0].style.pointerEvents = "auto"
      closingCards[1].style.pointerEvents = "auto"
      closeCard(closingCards)
    }, 1700)
  }
  openedCards = []; // cleaned array after checked
  if(successValue == 8) {
    win()
  }
}

/**  Make cards rotate when clicked also check for win */
function cardRotation(card) {
  flipCard(card) // call flip card for first click
  openedCards.push(card)
  if (openedCards.length % 2 == 0) { // 2 cards are opened so do a check
    cardCheck()
  }
}

/**
  By assigning animation style to flip card
  When card is flipped, it is not clickable
*/
function flipCard(card) {
  card.style.animation = "flipCard 1.25s linear"
  card.style.animationFillMode = "forwards"
  card.style.pointerEvents = "none"
}

/**  By assigning animation style to close card */
function closeCard(cards) {
  cards[0].style.animation = "closeCard 1.25s linear"
  cards[1].style.animation = "closeCard 1.25s linear"
}

/** win function by showing an gif */
function win() {
  document.getElementById("winningPage").style.display = "block"
  window.scrollTo(0,document.body.scrollHeight);
}

/** Vietnamese word change */
function changeToVietnamese() {
  engArray = ["Táo", "Buýt", "Cô-Giáo", "Nước ép", "Mèo", "Máy-bay", "Màu-xanh", "Đĩa"]
  clearBoard()
  cardFilling()
  document.getElementsByTagName('p')[0].innerHTML = "Hãy tìm những cặp từ đồng nghĩa để chiến thắng"
  alert("Chuyển đổi thành công")
}

/** clear content of all cards */
function clearBoard() {
  var cards = document.getElementsByClassName('card')
  for (var i = 0; i < 16; i++) {
    cards[i].removeChild(cards[i].childNodes[1])
  }
}
