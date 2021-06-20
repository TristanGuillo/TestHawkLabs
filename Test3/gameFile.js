// Cross Browsers height and width 
var screenWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var screenHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

//Var in global 

//3 div for each screen of the game
var divStartGame = document.createElement("div");
var divGame = document.createElement("div");
var divEndGame = document.createElement("div");

// Bowl image
var bowlImg = new Image();

// Logo image
var logo = new Image();

// Label Score
var scoreLabel = document.createElement("label");
var showScoreLabel = document.createElement('label');

// Best Size for element of the game
var bowlGameSize = (screenWidth * 0.35);
var cerealGameSize = (screenWidth * 0.15);

var bowlGameStartX = (screenWidth / 2) - (bowlGameSize / 2);
var bowlGameStartY = screenHeight - bowlGameSize;
var bowlGameCurrentX = bowlGameStartX;

// Number of Cereals to fall
var totalCereal = 10;

// Score of the game
var score = 0;

//Number of collision
var totalCollison = 0;

// First function, create all the element of the game
function createGame() {
    //console.log(" ===== createGame =====");

    //Div start screen
    divStartGame.id = 'divStartGame';
    divStartGame.style.height = screenHeight + "px";
    divStartGame.style.width = screenWidth + "px";
    divStartGame.style.backgroundColor = "#9e5d5d52";
    divStartGame.style.position = "absolute";
    divStartGame.style.visibility = "visible";

     //Div game screen
    divGame.id = 'divGame';
    divGame.style.height = screenHeight + "px";
    divGame.style.width = screenWidth + "px";
    divGame.style.backgroundColor = "#9e5d5d52";
    divGame.style.position = "absolute";
    divGame.style.visibility = "hidden";

    //div end screen
    divEndGame.id = 'divEndGame';
    divEndGame.style.height = screenHeight + "px";
    divEndGame.style.width = screenWidth + "px";
    divEndGame.style.backgroundColor = "#9e5d5d52";
    divEndGame.style.position = "absolute";
    divEndGame.style.visibility = "hidden";

    bowlImg.src = '../images/bowl.png';
    bowlImg.style.width = bowlGameSize + "px";
    bowlImg.style.height = bowlGameSize + "px";
    bowlImg.style.position = "absolute";
    bowlImg.style.left = bowlGameStartX + "px";
    bowlImg.style.top = bowlGameStartY + "px";

    // listen any touch event
    bowlImg.addEventListener('touchstart', handleTouchEvent, true);
    bowlImg.addEventListener('touchmove', handleTouchEvent, true);
    bowlImg.addEventListener('touchend', handleTouchEvent, true);
    bowlImg.addEventListener('touchcancel', handleTouchEvent, true);

    logo.src = "../images/logo.png";
    logo.style.width = "80%";
    logo.style.position = "absolute";
    logo.style.display = "block";
    logo.style.margin = "auto";
    logo.style.left = "0";
    logo.style.right = "0";
    logo.style.top = "20%";

    var jouerBtn = new Image();
    jouerBtn.src = "../images/jouer.png";
    jouerBtn.style.width = "60%";
    jouerBtn.style.position = "absolute";
    jouerBtn.style.display = "block";
    jouerBtn.style.margin = "auto";
    jouerBtn.style.left = "0";
    jouerBtn.style.right = "0";
    jouerBtn.style.bottom = "20%";
    jouerBtn.addEventListener('click', () => {
        displayGameScreen();
    });

    scoreLabel.style.position="absolute";
    scoreLabel.style.display="block";
    scoreLabel.style.top="2%";
    scoreLabel.style.left="2%";
    scoreLabel.style.fontSize="8vw";
    scoreLabel.style.fontFamily = "Fantasy";
    scoreLabel.innerHTML = "0 / 10";

    var tweetbutton = document.createElement('img');
    tweetbutton.src="../images/tweetbtn.png"
    tweetbutton.style.display ="block";
    tweetbutton.style.position="absolute";
    tweetbutton.style.width="42%";
    tweetbutton.style.top="75%";
    tweetbutton.style.left="0";
    tweetbutton.style.right="0";
    tweetbutton.style.margin="auto";
    tweetbutton.addEventListener('click', ()=>{
        window.location.href = 'https://twitter.com/intent/tweet?text=Voici+mon+score+au+jeu+de+KeyLogs+%3A+'+score+'+%21';
    })

    var shareScoreLabel = document.createElement('label');
    shareScoreLabel.style.position="absolute";
    shareScoreLabel.style.fontSize="8vw";
    shareScoreLabel.style.fontFamily = "Fantasy";
    shareScoreLabel.style.top="70%";
    shareScoreLabel.style.left="0";
    shareScoreLabel.style.right="0";
    shareScoreLabel.style.margin="auto";
    shareScoreLabel.style.width="70%";
    shareScoreLabel.innerHTML = "Partager mon score : ";

    showScoreLabel.style.position="absolute";
    showScoreLabel.style.fontSize="9vw";
    showScoreLabel.style.fontFamily = "Fantasy";
    showScoreLabel.style.top="40%";
    showScoreLabel.style.left="0";
    showScoreLabel.style.right="0";
    showScoreLabel.style.margin="auto";
    showScoreLabel.style.width="80%";
    showScoreLabel.style.textAlign="center";

    // Append each element to their div
    divStartGame.appendChild(logo);
    divStartGame.appendChild(jouerBtn);

    divGame.appendChild(bowlImg);
    divGame.appendChild(scoreLabel);

    divEndGame.appendChild(logo.cloneNode(true));
    divEndGame.appendChild(tweetbutton);
    divEndGame.appendChild(shareScoreLabel);
    divEndGame.appendChild(showScoreLabel);

    document.body.appendChild(divStartGame);
    document.body.appendChild(divGame);
    document.body.appendChild(divEndGame);


    // Generate Cereals
    for (let i = 1; i < totalCereal + 1; i++) {
        console.log("====== addCereal");
        var newCereal = new Image();
        newCereal.id = "Cereal" + i;
        // Change color of cereal each 2 cereals
        if (i % 2 === 0) {
            newCereal.src = '../images/cereal1.png';
        }
        else {
            newCereal.src = '../images/cereal2.png';
        }
        newCereal.style.width = cerealGameSize + "px";
        newCereal.style.position = "absolute";
        newCereal.style.top = - (bowlImg.height) + "px";
        // Random position of Cereals 
        newCereal.style.left = (Math.floor(Math.random() * (screenWidth - cerealGameSize + 1)) + 0) + "px";
        divGame.appendChild(newCereal);
    }
}

//function to move the bowl with Touch
function handleTouchEvent(e) {
    if (e.touches.length === 0) return;
    e.preventDefault();
    e.stopPropagation();
    var touch = e.touches[0];
    //Touch the bowl to move it
    //Check that the bowl stay in the screen
    if ((touch.pageX - bowlImg.width / 2) > 0 && (touch.pageX - bowlImg.width / 2 + bowlGameSize) < screenWidth) {
        bowlImg.style.left = (touch.pageX - bowlImg.width / 2) + 'px';
    }
}

// Animate the drop of cereals
function dropCereal(idCereal) {
    // next cereal to drop
    var currentCereal = document.getElementById(idCereal);

    // Random Speed falling for each cereal
    var speed = Math.floor(Math.random() * 10) + 5;
    var animateDrop = setInterval(() => {
        //if the cereal touch the end of the screen
        if (parseInt(currentCereal.style.top) > screenHeight) {
            collisionEndScreen(animateDrop);
        }
        // if the cereal touch the bowl
        if (testCollision(currentCereal)) {
            catchCereal(currentCereal, animateDrop);
        }
        //drop cereal
        else {
            currentCereal.style.top = parseInt(currentCereal.style.top) + 1 + "px";
        }
    }, speed);
}

// When Cereal touch the ground
function collisionEndScreen(animateDrop) {
    clearInterval(animateDrop);
    //incremente number total collision
    totalCollison = totalCollison + 1;
    // console.log("Collision numéro : ", totalCollison);
    //if all cereals have collided
    if (totalCollison == totalCereal) {
        displayEndScreen();
    }
}

// When cereal is catch by the bowl
function catchCereal(currentCereal, animateDrop) {
    clearInterval(animateDrop);
    // Delete cereal
    currentCereal.style.display = "none";
    // Incremente Score and his labels
    score = score + 1;
    scoreLabel.innerHTML = score + " / 10";

    // console.log("UPDATE SCORE : " + score);

    //incremente number total collision
    totalCollison = totalCollison + 1;
    // console.log("Collision numéro : ", totalCollison);
    //if all cereals have collided
    if (totalCollison == totalCereal) {
        displayEndScreen();
    }
}

// Test collision
function testCollision(currentCereal) {
    var bowlX = parseInt(bowlImg.style.left);
    var bowlY = parseInt(bowlImg.style.top);
    var bowlWidth = bowlImg.width;
    var bowlHeight = bowlImg.height;
    var cerealX = parseInt(currentCereal.style.left);
    var cerealY = parseInt(currentCereal.style.top);
    var cerealWidth = currentCereal.width;
    var cerealHeight = currentCereal.height;
    return isColliding(bowlX, bowlY, bowlWidth, bowlHeight,
        cerealX, cerealY, cerealWidth, cerealHeight);
}

// Test collision
function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + w2);
}

// Display End screen
function displayEndScreen() {
    divGame.style.visibility = "hidden";
    divEndGame.style.visibility = "visible";

    //Edit text label with finale score
    showScoreLabel.innerHTML = "Félicitation vous avez attrapé  " + score + " céréales sur 10 !";
}

// Display Game screen
function displayGameScreen() {
    divGame.style.visibility = "visible";
    divStartGame.style.visibility = "hidden";
    startGame();
}

var i = 1;
function startGame() {
    dropCereal("Cereal" + i);
    setTimeout(()=> {
        if (i < totalCereal) {
            i++;
            startGame();
        }
    }, 2500);
}

// Onload launch function CreateGame
window.onload = createGame();
