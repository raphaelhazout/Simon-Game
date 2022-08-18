var checker = false;
var level = 0 ;
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function () {
    if(level!==0)
    {
        var userChoosenColor = $(this).attr("id");
        userClickedPattern.push(userChoosenColor);
        playSound(userChoosenColor);
        animatePress($(this));
        checktAnswer(userClickedPattern.length-1);
    }
});

function nextSequence(){
    userClickedPattern = [];
    $("h1").text("level - " + level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) { 

    currentColor.addClass("pressed");
    setTimeout(function(){currentColor.removeClass("pressed");},100);
}

$(document).keypress(function () { 
    if(!checker){
        nextSequence(); 
        checker = true;
    }   
});

function checktAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game-Over, Press any key to Restart!");
        setTimeout(function(){$("body").removeClass("game-over");},300);

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    checker = false;
}