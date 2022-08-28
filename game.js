//jshint esversion:6
var gamepattern=[];
var buttonId=["green","red","yellow","blue"];

function randomGenerateCol()
{
    return Math.floor(Math.random()*4);
}

function showGamePattern()
{
    setTimeout(() => {
        $("#"+gamepattern[gamePattern_i]).fadeOut(100).fadeIn(100);

    var sound =new Audio("sounds/"+gamepattern[gamePattern_i]+".mp3");
    sound.play();
    gamePattern_i++;
    if(gamePattern_i<gamepattern.length)
    {
        showGamePattern();
    }
    }, 700);
    
}

function disableButton()
{
    document.querySelectorAll(".btn").forEach(element => {
        element.setAttribute("disabled","disabled");
    });
}

function enableButton()
{
    document.querySelectorAll(".btn").forEach(element => {
        element.removeAttribute("disabled");
    });
}

var level=0;
var isKeyPressed=false;
var userPattern=0;
var gamePattern_i=0;



disableButton();

$(document).keypress(function()
{
    if(!isKeyPressed)
    {
        isKeyPressed=true;
        level++;
        document.querySelector("#level-title").innerHTML="LEVEL "+level;


        var gameColor=buttonId[randomGenerateCol()]
        gamepattern.push(gameColor);


        $("#"+gameColor).fadeOut(100).fadeIn(100);

        var sound =new Audio("sounds/"+gameColor+".mp3");
        sound.play();

        enableButton();
    }
});


$(".btn").click(function()
{
    var userInput=$(this).attr("id");

    $("."+userInput).fadeOut(100).fadeIn(100);
    var sound=new Audio("sounds/"+userInput+".mp3");
    sound.play();

    if(gamepattern[userPattern]!=userInput)
    {
        document.querySelector("#level-title").innerHTML="WRONG INPUT !! PRESS ANY KEY TO CONTINUE !!";

        isKeyPressed=false;

        gamepattern=[];
        userPattern=0;
        level=0;
        gamePattern_i=0;
        
        disableButton();

        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 100);

        var soundWrong=new Audio("sounds/wrong.mp3");
        soundWrong.play();
    }
    else if(gamepattern[userPattern]===userInput && userPattern===gamepattern.length-1)
    {
        disableButton();

        level++;
        document.querySelector("#level-title").innerHTML="LEVEL "+level;

        userPattern=0;
        gamePattern_i=0;
        showGamePattern();

        setTimeout(() => {
            var newgeneratedBtn=buttonId[randomGenerateCol()];
            gamepattern.push(newgeneratedBtn);

            $("#"+newgeneratedBtn).fadeOut(100).fadeIn(100);

            var sound=new Audio("sounds/"+newgeneratedBtn+".mp3");
            sound.play();

            enableButton();
        }, 700*(gamepattern.length+1));

    }
    else
    {
        userPattern++;
    }
});