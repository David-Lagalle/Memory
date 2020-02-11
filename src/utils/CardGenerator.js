import one from "../images/cards/as.png";
import two from "../images/cards/2.png";
import three from "../images/cards/3.png";
import four from "../images/cards/4.png";
import five from "../images/cards/5.png";
import six from "../images/cards/6.png";
import seven from "../images/cards/7.png";
import eight from "../images/cards/8.png";
import nine from "../images/cards/9.png";
import ten from "../images/cards/10.png";
import jack from "../images/cards/jack.png";
import queen from "../images/cards/queen.png";
import king from "../images/cards/king.png";
import joker from "../images/cards/joker.png";

class Card {
  constructor() {
    this.name = "";
    this.scoreValue = "";
    this.image = "";
    this.position = "";
  }
}

var defaultCardValues = [
  { name: "Joker", scoreValue: 100, image: joker },
  { name: "Rois", scoreValue: 80, image: king },
  { name: "Reine", scoreValue: 80, image: queen },
  { name: "Vallet", scoreValue: 60, image: jack },
  { name: "10", scoreValue: 50, image: ten },
  { name: "9", scoreValue: 45, image: nine },
  { name: "8", scoreValue: 40, image: eight },
  { name: "7", scoreValue: 35, image: seven },
  { name: "6", scoreValue: 30, image: six },
  { name: "5", scoreValue: 25, image: five },
  { name: "4", scoreValue: 20, image: four },
  { name: "3", scoreValue: 15, image: three },
  { name: "2", scoreValue: 10, image: two },
  { name: "1", scoreValue: 90, image: one }
];

export function generateRandomCards() {
  let cardList = [...defaultCardValues, ...defaultCardValues];
  var indexList = [];
  var shuffledCardList = shuffle(cardList);

  var newArray = shuffledCardList.map(card => {
    var rObj = {};
    rObj["id"] = indexList.includes(card.name)
      ? card.name + "B"
      : card.name + "A";
    rObj["name"] = card.name;
    rObj["scoreValue"] = card.scoreValue;
    rObj["image"] = card.image;
    rObj["position"] = shuffledCardList.indexOf(card);
    indexList.push(card.name);
    return rObj;
  });
  return newArray;
}

function shuffle(array) {
  var counter = array.length,
    temp,
    index;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
function resetGame() {
  const allCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
  const suffledCards = shuffle(allCards);
  console.log(suffledCards);
}
