var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea") 
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships = [{locations: ["06", "16", "26"], hits: ["", "", ""] },
             {locations: ["24", "34", "44"], hits: ["", "", ""] },
             {locations: ["10", "11", "12"], hits: ["", "", ""] }],

    fire: function(guess) {
          for (var i = 0; i < this.numShips; i++) {
               var ship = this.ships[i];
               var index = ship.locations.indexOf(guess);
               if (index >= 0) {
                   // We have a hit!
                   ship.hits[index] = "hit";
                   view.displayHit(guess);
                   view.displayMessage("Hit!");
                   if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                       this.shipsSunk++;
                   }
                 return true;
              }
      }
      view.displayMiss(guess);
      view.displayMessage("You missed.");
      return false;
   }, 
   isSunk: function(ship) { 
        for (var i=0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false
            }
        }
    return true;
    }
};
function init() {
    var fireButton = document.getElementById("fireButton");
fireButton.onclick = handleFireButton;
},
function handleFireButton {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
   controller.processGuess(guess);
    guessInput.value = "";
}
window.onload = init;