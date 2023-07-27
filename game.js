var buttonColours = ["red", "blue", "green", "yellow", "pink", "orange"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0; 

    $(document).on("keypress", function(){
        if(!started) {
            $('#level-title').text("Level " + level);
            nextSequence();
            started = true;

        }

        
    });


$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    
    //console.log(userClickedPattern);
    
    animate(userChosenColour); 
    //Animating the user clicked key 

    playSound(userChosenColour);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
       
});


function nextSequence() {
  
  level += 1;
  $('#level-title').html(" -> Level " + level + " <-");
  var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  console.log(gamePattern);
  userClickedPattern = [];
}

function animate(key) {
    var new_key = $('.' + key);
    $(new_key).addClass('pressed');
    setTimeout (function() {
        new_key.removeClass('pressed');
    }, 100);
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}


function checkAnswer (currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
    

    if (gamePattern.length === userClickedPattern.length){
        setTimeout(function() {
                nextSequence();
            
        }, 1000);

    }
}
    
    else {
    resetEverything();
    console.log("Wrong");
    
    }
}

function resetEverything() {
    $('h1').html(" <p> -> Game Over... <- </p> <br> <p> -> Press any Key to Restart <- <p>");
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    playSound('wrong');
    $('body').addClass('game-over');
    //$('body').remove('mine');
    setTimeout(function(){
        $('body').removeClass('game-over');
        //$('body').addClass('mine');
    }, 200)
}