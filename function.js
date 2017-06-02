var engArray = ["Apple", "Bus", "Teacher", "Juice", "Cat", "Airplane", "Blue", "Plate", "honesty" , "equality" , "First place",
"Action", "Hapiness", "Earth", "Secret", "City", "Emotion", "Crime", "Anxiety", "Nature", "Soap", "Machine", "To dance", "Just right",
"Habit", "Expirience", "Strength", "Shape", "Color", "Taste", "Meeting", "Coast/ Beach", "Price", "Novel", "Manager", "Future",
"Usually", "Free", "Salary", "Color", "Zoo", "Grape", "Caution", "Police", "Relationship", "Research", "Sound"]
var japArray = ["りんご", "バス", "先生", "ジュース", "ねこ", "ひこうき", "あおい", "おさら", "しょうじき" , "びょうどう", "いちばん",
"こうどう", "こうふく", "ちきゅう", "ひみつ", "とし", "かんじょう", "はんざい", "ふあん", "しぜん", "せっけん", "きかい", "おどります", "ちょうどいい",
"しゅうかん", "けいけん", "ちから", "かたち", "いろ", "あじ", "かい", "かいがん", "ねだん", "しょうせつ", "かんりにん", "しょうらい",
"たいてい", "むりょう", "きゅうりょう", "いろ", "どうぶつえん", "ぶどう", "ちゅうい", "けいさつ", "かんけい", "けんきゅう", "おと"]
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
  var randomNum = Math.floor(Math.random() * engArray.length)
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
    setTimeout(function() {
      win()
    }, 3000)
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
  card.style.animation = "flipCard 1s linear"
  setTimeout(function() {
    card.style.backgroundImage = "none"
  }, 500)
  card.style.animationFillMode = "forwards"
  card.style.pointerEvents = "none"
}

/**  By assigning animation style to close card */
function closeCard(cards) {
  setTimeout(function() {
    cards[0].style.backgroundImage = "url('./card.png')"
    cards[1].style.backgroundImage = "url('./card.png')"
  }, 500)
  cards[0].style.animation = "closeCard 1s linear"
  cards[1].style.animation = "closeCard 1s linear"
}

/** win function by showing an gif */
function win() {
  document.getElementById("winningPage").style.display = "block"
  window.scrollTo(0,document.body.scrollHeight);
}

/** Vietnamese word change */
function changeToVietnamese() {
  engArray = ["Táo", "Xe buýt", "Giáo viên", "Nước ép", "Mèo", "Máy bay", "Màu xanh", "Đĩa", "Thành thật" , "Công bằng" , "Hạng nhất",
  "Hành động", "Niềm vui", "Trái Đất", "bí mật", "Thành phố", "Cảm súc", "Tội phạm", "Nỗi lo âu", "Tự nhiên", "xà phòng", "Máy móc", "Nhảy nhót", "Vừa đủ",
  "Thói quen", "Kinh nghiệm", "Sức mạnh", "Hình dáng", "Màu sắc", "Mùi vị", "Cuộc họp", "Bờ biển", "Giá tiền", "Tiểu thuyết", "Quản lý", "Tương lai",
  "Thường xuyên", "Miễn phí", "Lương bổng", "Màu sắc", "Sở thú", "Nho", "Cẩn thận", "Cảnh sát", "Mối quan hệ", "Nghiên cứu", "Âm thanh"]
  wordsArray = []
  clearBoard()
  wordsArrayFilling()
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

/** Anime version transform */
function changeToAnime() {
  engArray = ["Baka ばか", "Nani なに", "Kawaii かわい", "Arigatou ありがとう", "Senpai せんぱい", "Sasuke", "Dragon Ball", "Pokemon"]
  japArray = ["Idiot", "What", "Cute", "Thank you", "Senior/ Elder", "Naruto", "Songoku", "Pikachu"]
  wordsArray =["Baka ばか", "Idiot", "Nani なに", "What", "Kawaii かわい", "Cute", "Arigatou ありがとう", "Thank you", "Senpai せんぱい", "Senior/ Elder",
  "Sasuke", "Naruto", "Dragon Ball", "Songoku", "Pokemon", "Pikachu"]
  clearBoard()
  cardFilling()
  alert("Welcom Otaku-san!!!")
}
