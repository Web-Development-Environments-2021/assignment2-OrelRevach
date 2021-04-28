
var lives;
var gameInterval;
var playMusic= false;
var isGameOver = false;
var startMusic;
var gameOverMus;
var timeOut;
var stop=false;
var timeInterval;
var mouth_pacman;
var food_remain;
var monsters = [{ x: 1, y: 1, img: "./images/monster1.ico", xPrev: 1, yPrev: 1 }, { x: 21, y: 15, img: "./images/monster2.png", xPrev: 21, yPrev: 15 }, { x: 1, y: 15, img: "./images/monster3.ico", xPrev: 1, yPrev: 15 }, { x: 21, y: 1, img: "./images/monster4.png", xPrev: 21, yPrev: 1 }];
var startMonsters = [{ x: 1, y: 1, img: "./images/monster1.ico", xPrev: 1, yPrev: 1 }, { x: 21, y: 15, img: "./images/monster2.png", xPrev: 21, yPrev: 15 }, { x: 1, y: 15, img: "./images/monster3.ico", xPrev: 1, yPrev: 15 }, { x: 21, y: 1, img: "./images/monster4.png", xPrev: 21, yPrev: 1 }];
var board;
var ballCount;
var gameKeys = [];
var context;
var shape = new Object();
var score;
var pac_color;
var interval;
var keys =[];
var colorBalls = ["#c7ffd8", "#98ded9", "#161d6f"];
var gameTime;
var timeLimits;
var numOfMonsters;
var ball5;
var ball15;
var ball25;
var loseGame;
var BallsAte;


$(document).ready(function () {
	context = canvas.getContext("2d");
});

function Start() {
	startGame();
	board = new Array();
	score = 0;
	lives = 5;
	BallsAte = 0;
	loseGame = false;
	timeOut = false;
	stop = false;
	pac_color = "green";
	keys = gameKeys;
	food_remain = ballCount;
	timeLimits = gameTime;
	ball5 = 0.6 * food_remain;
	ball15 = 0.3 * food_remain;
	ball25 = 0.1 * food_remain;
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 0, 4],
		[4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 0, 0, 4, 0, 4],
		[4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4],
		[4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4],
		[4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 0, 0, 4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];
	initPacmen();
	initMonsters();
	initClockAndLives();
	while (food_remain > 0) {
		emptyCell = findRandomEmptyCell(board);
		if (ball5 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 5;
			ball5--;
		}
		else if (ball15 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 15; 
			ball15--;
		}
		else if (ball25 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 25; 
			ball25--;
		}
		food_remain--;
	}
function startGame() {
	$("#homePage").hide();
	$("#loginPage").hide();
	$("#registerPage").hide();
	$("#settingPage").hide();
	$("#canves").show();
	$("#welcome_user").text(`Welcome ${player.username}!`);
}
	
/**up here */
	for(var i=0;i<lives;i++){
		var img=document.createElement("img");
		img.src="./images/health.png";
		img.setAttribute("height", "30");
		img.setAttribute("width", "30");
		var imglives=document.getElementById("lblLives");
		imglives.appendChild(img);
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.code] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.code] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);

	timeInterval = setInterval(startTimer, 1000);
	gameInterval = setInterval(monsterMovement, 600);
}

function initPacmen() {
	var emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2; 
}

function initClockAndLives(){
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 9; 
	emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] =10; 
	emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] =10; 
}

function GetKeyPressed() {
	if (keysDown[keys[0]]) {
		return 1;
	}
	if (keysDown[keys[1]]) {
		return 2;
	}
	if (keysDown[keys[2]]) {
		return 3;
	}
	if (keysDown[keys[3]]) {
		return 4;
	}
}

function learningMove(monster) {
	var optionalSteps = new Array();
	var max = Number.MAX_SAFE_INTEGER;
	var bestMove;
	var step;
	var dis;
	optionalSteps.push([monster.x - 1, monster.y]);
	optionalSteps.push([monster.x + 1, monster.y]);
	optionalSteps.push([monster.x, monster.y + 1]);
	optionalSteps.push([monster.x, monster.y - 1]);
	for (var i = 0; i < optionalSteps.length; i++) {
		step = optionalSteps[i];
		if (board[step[0]][step[1]] != 4) {
			dis = Math.sqrt(Math.pow(step[0] - shape.i, 2) + Math.pow(step[1] - shape.j, 2));
			if (dis < max && (monster.xPrev != step[0] || monster.yPrev != step[1])) {
				max = dis;
				bestMove = { x: step[0], y: step[1] };
			}
		}
	}
	return bestMove;
}


function createMonster() {
	for (var i = 0; i < numOfMonsters; i++) {
		var center = new Object();
		var monster = monsters[i];
		center.x = monster.x * 35 + 20;
		center.y = monster.y * 35 + 20;
		var monster_img = new Image();
		monster_img.width = "30px";
		monster_img.height = "30px";
		monster_img.src = monster.img;
		context.drawImage(monster_img, center.x - 20, center.y - 20, 30, 30);
		if (monster.x == shape.i && monster.y == shape.j) {
			monsterMeetPacmen();
		}
	}
}

function monsterMovement() {
	for (var i = 0; i < numOfMonsters; i++) {
		var best = learningMove(monsters[i]);
		monsters[i].xPrev = monsters[i].x;
		monsters[i].yPrev = monsters[i].y;
		monsters[i].x = best.x;
		monsters[i].y = best.y;
	}
}


function monsterMeetPacmen() {
	let drugs = document.getElementById("lblLives");
         drugs.removeChild(drugs.lastChild);
	if (lives > 1) {
		lives--;
		score = score - 10;
		lblScore.value = score
		initGameAfterHit();
	}
	else {
		lives--;
		score = score - 10;
		lblScore.value = score
		loseGame = true;
		gameOver();
	}	
}


function findRandomEmptyCell(board) {
	var i = Math.floor((Math.random() * 22) + 1);
	var j = Math.floor((Math.random() * 16) + 1);
	while (board[i][j] != 0) {
		i = Math.floor((Math.random() * 22) + 1);
		j = Math.floor((Math.random() * 16) + 1);
	}
	return [i, j];
}
function pacmanMeetMonster(){
	for(var i=0; i<numOfMonsters; i++){
		var monster = monsters[i];
		if (monster.x == shape.i && monster.y == shape.j) {
			monsterMeetPacmen();
		}
	}
}


function UpdatePosition() {
	$("#lblScore").text(score);
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			mouth_pacman = 1;
		}
	}
	if (x == 2) {
		if (shape.j < 17 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			mouth_pacman = 2;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			mouth_pacman = 3;
		}
	}
	if (x == 4) {
		if (shape.i < 22 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			mouth_pacman = 4;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score = score + 5;
		BallsAte++;
	}
	else if (board[shape.i][shape.j] == 15) {
		score = score + 15;
		BallsAte++;
	}
	else if (board[shape.i][shape.j] == 25) {
		score = score + 25;
		BallsAte++;
	}
	else if(board[shape.i][shape.j] == 9){
		timeLimits = timeLimits + 30;
	}
	else if(board[shape.i][shape.j] == 10){
		lives++;
		var img = document.createElement("img");
		img.src = "./images/health.png";
		img.setAttribute("height", "30");
		img.setAttribute("width", "30");
		var livesImg = document.getElementById("lblLives");
		livesImg.appendChild(img);
	}
	board[shape.i][shape.j] = 2;
	pacmanMeetMonster();

	if (BallsAte == ballCount) {
		timeOut = true;
		gameOver();
	} else {
		Draw();
	}
}

function Draw() {
	canvas.width = canvas.width;
	lblScore.value = score;
	lblTime.value = timeLimits;
	showSettings();
	for (var i = 0; i < 23; i++) {
		for (var j = 0; j < 17; j++) {
			var center = new Object();
			center.x = i * 35 + 20;
			center.y = j * 35 + 20;
			if (board[i][j] == 2) {
				if (mouth_pacman == 2) { 
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.65 * Math.PI, 0.35 * Math.PI); 
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color;  
					context.fill();
					context.beginPath();
					context.arc(center.x + 6, center.y + 4, 2.5, 0, 2 * Math.PI); 
					context.fillStyle = "black"; 
					context.fill();
				}
				else if (mouth_pacman == 3) { 
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.85 * Math.PI); 
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x - 2, center.y - 7, 2.5, 0, 2 * Math.PI); 
					context.fillStyle = "black"; 
					context.fill();
				}
				else if (mouth_pacman == 1) {
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.65 * Math.PI, 1.35 * Math.PI); 
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x + 6, center.y - 4, 2.5, 0, 2 * Math.PI); 
					context.fillStyle = "black"; 
					context.fill();
				}
				else if (mouth_pacman == 4) {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI);
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x + 2, center.y -7, 2.5, 0, 2 * Math.PI); 
					context.fillStyle = "black";
					context.fill();
				}
				else {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI);
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x + 2, center.y -7, 2.5, 0, 2 * Math.PI); 
					context.fillStyle = "black"; 
					context.fill();
				}
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); 
				context.fillStyle = colorBalls[0];
				context.fill();
				context.stroke();

			}
			else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI);
				context.fillStyle = colorBalls[1]; 
				context.fill();
				context.stroke();

			}
			else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 9, 0, 2 * Math.PI); 
				context.fillStyle = colorBalls[2]; 
				context.fill();
				context.stroke();

			}
			else if (board[i][j] == 4) {
				var wall = new Image();
				wall.src = "./images/wall.png";
				context.drawImage(wall, center.x - 20, center.y - 20, 35, 35);
				
			}
			else if(board[i][j] == 9){
				var clock = new Image();
				clock.src ="./images/clock.png";
				context.drawImage(clock, center.x - 18, center.y - 18, 30, 30);
			}
			else if(board[i][j] == 10){
				var health = new Image();
				health.src ="./images/health.png";
				context.drawImage(health, center.x - 20, center.y - 20, 35, 35);
			}
		}
	}
	createMonster();
}

window.addEventListener("keydown", function (e) {
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}, false);



function showSettings() {
	lblUp.value = gameKeys[0];
	lblDown.value = gameKeys[1];
	lblLeft.value = gameKeys[2];
	lblRight.value = gameKeys[3];
	lblBalls.value = ballCount;
	lblBall5.value = colorBalls[0];
	lblBall5.style["background-color"] = colorBalls[0];
	lblBall15.value = colorBalls[1];
	lblBall15.style["background-color"] = colorBalls[1];
	lblBall25.value = colorBalls[2];
	lblBall25.style["background-color"] = colorBalls[2];
	lblMonsters.value = numOfMonsters;
}
function startTimer() {
	timeLimits--;
	if (timeLimits == 0 && !loseGame) {
		timeOut= true;
		gameOver();
	}
}

function clearAll(){
	window.clearInterval(interval);
	window.clearInterval(timeInterval);
	window.clearInterval(gameInterval);
	timeLimits = 0;
	stop= true;
	keys = undefined;
	
}
function gameOver() {
	startMusic.pause();
	playMusic = false;
	var message;
	var messageWidth;
	var imageOver=new Image();
	if(!stop){
		if (loseGame) {
			message = "Loser!";
			gameOverMus = new Audio('./music/GameOverVoiceSoundEffect.mp3');
			imageOver.src ="./images/loser.png";
			messageWidth =260;
		}
		else if (timeOut && score < 100) {
			message = "You are better than " + score + " points!";
			gameOverMus = new Audio('./music/MarioBrosGAMEOVER.mp3');
			imageOver.src ="./images/tryAgain.jpg";
			messageWidth =20;
		}
		else if (timeOut) {
			message = "Winner!!!";
			gameOverMus=new Audio('./music/winner.mp3');
			imageOver.src ="./images/winner.png";
			messageWidth =220;
		}
		gameOverMus.play();
		isGameOver = true;
		clearAll();
		context.clearRect(0,0,canvas.width,canvas.height);
		context=canvas.getContext("2d");
		
		imageOver.onload=function(){
		  	context.drawImage(imageOver,100,100,400,400);
			context.font = "50px Verdana";
			// Create gradient
			var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
			gradient.addColorStop("0"," black");
			gradient.addColorStop("0.5", "blue");
			gradient.addColorStop("1", "black");
			context.fillStyle = gradient;
			context.fillText(message, messageWidth, 540);
	}
}
}
function newGame() {
	clearAll();
	if(isGameOver)
	  gameOverMus.pause();
	if(!playMusic){
		startMusic = new Audio('./music/startGame.mp3');
		startMusic.play();
		playMusic=true;
	}else{
		startMusic.pause();
		startMusic = new Audio('./music/startGame.mp3');
		startMusic.play();
	}

	initMonsters();
	timeLimits = gameTime;
	keys = gameKeys;
	for(var i=0;i<lives;i++){
		let lives = document.getElementById("lblLives");
         lives.removeChild(lives.lastChild);
	}
	Start();
}


function stopGame(){
	clearAll();
	if(isGameOver)
	  gameOverMus.pause();
	if(playMusic){
	  startMusic.pause();
	  playMusic = false;
	}
}


function initGameAfterHit() {
	board[shape.i][shape.j] = 0;
	initPacmen();
	initMonsters();

}

function initMonsters() {
	for (var i = 0; i < numOfMonsters; i++) {
		monsters[i].x = startMonsters[i].x;
		monsters[i].xPrev = startMonsters[i].xPrev;
		monsters[i].y = startMonsters[i].y;
		monsters[i].yPrev = startMonsters[i].yPrev;
	}
}