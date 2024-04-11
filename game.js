var buttonColours = ["red", "blue", "green", "yellow"];

var gamepattern = [];

var userColourPattern = []

var level = 0;
var started = false;



$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function(){
    var userChoosenColour = $(this).attr("id");
    userColourPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userColourPattern.length -1);
})


function checkAnswer(currentLevel){
    if (gamepattern[currentLevel] === userColourPattern[currentLevel]) {
        console.log("success");
        if (userColourPattern.length === gamepattern.length) {
            setTimeout(function(){
                nextSequence() }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 200);
        $("h1").text("Game Over! Press any key to restart");
        startOver();
    }
}

function nextSequence(){

    userColourPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()  * 4);
    var randomChosenColour = buttonColours[randomNumber];;
    gamepattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function startOver(){
    gamepattern = [];
    level = 0 ;
    started = false ; 
}