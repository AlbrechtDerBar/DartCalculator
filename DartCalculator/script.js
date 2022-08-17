var activePlayer = 1;
var needToWin = 301;
var player1TotalAr = [];
var player1Misses = 0;
var player1Total = 0;
var player1Points = [];
var player1Score = 0;
var player2TotalAr = [];
var player2Misses = 0;
var player2Total = 0;
var player2Points = [];
var player2Score = 0;
var round = [];
var currRound = 1;

function gameMode(val) {
  needToWin = val;
  calculation();
}

function switchPlayer() {
  if(activePlayer == 1) {
    activePlayer = 2;
    var player = document.getElementById("player").innerText = "Player 2";
    round = [];
    calculation();
  }
  else {
    activePlayer = 1;
    var player = document.getElementById("player").innerText = "Player 1";
    round = [];
    currRound += 1;
    document.getElementById("currRound").innerText = currRound;
    calculation();

  }
}

function average() {
  if(activePlayer == 1) {
    var avg = player1Total/player1TotalAr.length;
    document.getElementById("average").innerText = avg;
  }
  else {
    var avg = player2Total/player2TotalAr.length;
    document.getElementById("average").innerText = avg;
  }
}

function accuracy() {
  if(activePlayer == 1) {
    if(player1Misses == 0) {
      document.getElementById("accuracy").innerText = "100%";
    }
    else {
      var pointValue = 100/player1TotalAr.length;
      var accuracy = 100 - (player1Misses * pointValue); 
      document.getElementById("accuracy").innerText = accuracy + "%"
    }
  }
  else {
    if(player2Misses == 0) {
      document.getElementById("accuracy").innerText = "100%";
    }
    else {
      var pointValue = 100/player2TotalAr.length;
      var accuracy = 100 - (player2Misses * pointValue); 
      document.getElementById("accuracy").innerText = accuracy + "%"
    }
  }
}

function points(elem) {
  if(activePlayer == 1) {
    if(elem.getAttribute("val") == 0) {
      player1Misses += 1;
    }
    player1Points.push(elem.getAttribute("val"));
    player1TotalAr.push(elem.getAttribute("val"));
    round.push(elem.getAttribute("val"));
    player1Score += parseInt(elem.getAttribute("val"));
    player1Total += parseInt(elem.getAttribute("val"));
    calculation();
    bust();
  }
  else {
    if(elem.getAttribute("val") == 0) {
      player2Misses += 1;
    }
    player2Points.push(elem.getAttribute("val"));
    player2TotalAr.push(elem.getAttribute("val"));
    round.push(elem.getAttribute("val"));
    player2Score += parseInt(elem.getAttribute("val"));
    player2Total += parseInt(elem.getAttribute("val"));
    calculation();
    bust();
  }
}

function calculation() {
  if(activePlayer == 1) {
    document.getElementById("round").innerText = round;
    document.getElementById("total").innerText = player1Score;
    var left = needToWin - player1Score;
    document.getElementById("left").innerText = left;
    if(left == 0) {
      window.alert("Player " + activePlayer + " wins!");
    }
    average();
    accuracy();
  }
  else {
    document.getElementById("round").innerText = round;
    document.getElementById("total").innerText = player2Score;
    var left = needToWin - player2Score;
    document.getElementById("left").innerText = left;
    if(left == 0) {
      window.alert("Player " + activePlayer + " wins!");
    }
    average();
    accuracy();
  }
}

function clearOne() {
  if(activePlayer == 1) {
    if(round.length == 0) {
      window.alert("There aren't any point to remove");
    }
    else {
      var tmpVal = round.pop();
      if(tmpVal == 0) {
        player1Misses -= 1;
      }
      player1Score -= tmpVal;
      player1Total -= tmpVal;
      player1Points.pop();
      player1TotalAr.pop();
      calculation();
    }
  }
  else {
    if(round.length == 0) {
      window.alert("There aren't any point to remove");
    }
    else {
      var tmpVal = round.pop();
      if(tmpVal == 0) {
        player1Misses -= 1;
      }
      player2Score -= tmpVal;
      player2Total -= tmpVal;
      player2Points.pop();
      player2TotalAr.pop();
      calculation();
    }
  }
}

function clearRound(elem) {
  var throws = round.length;
  if (activePlayer == 1) {
    for(i = 0; i < throws; i++) {
      var tmpVal = round.pop();
      if(tmpVal == 0) {
        player1Misses -= 1;
      }
      if(elem != 1) {
        player1TotalAr.pop();
        player1Total -= tmpVal;
      }
      player1Score -= tmpVal;
      player1Points.pop();
    }
    calculation();
  }
  else {
    for(i = 0; i < throws; i++) {
      var tmpVal = round.pop();
      if(tmpVal == 0) {
        player2Misses -= 1;
      }
      if(elem != 1) {
        player2TotalAr.pop();
        player2Total -= tmpVal;
      }
      player2Score -= tmpVal;
      player2Points.pop();
    }
    calculation();
  }
}

function bust() {
  if(activePlayer == 1) {
    var left = needToWin - player1Score;
    if(left < 0) {
      clearRound(1);
    }
  }
  else {
    var left = needToWin - player2Score;
    if(left < 0) {
      clearRound(1);
    }
  }
}