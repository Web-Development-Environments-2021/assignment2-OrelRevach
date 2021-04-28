



jQuery.validator.addMethod("checkKey1", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key1==key2 || key1==key3 || key1==key4);
});

jQuery.validator.addMethod("checkKey2", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key2==key3 || key2==key4 || key2==key1);
});
jQuery.validator.addMethod("checkKey4", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key4==key1 || key4==key2 || key4==key3);
});
jQuery.validator.addMethod("checkKey3", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key3==key4 || key3==key1 || key3==key2);
});
jQuery.validator.addMethod("checkColor3", function (value, element) {
    color1 = $("#Ball5").val();
    color2 = $("#Ball15").val();
    color3 = $("#Ball25").val();
    return !(color1 == color3 || color2 == color3);
});
jQuery.validator.addMethod("checkColor2", function (value, element) {
    color1 = $("#Ball5").val();
    color2 = $("#Ball15").val();
    color3 = $("#Ball25").val();
    return !(color1 == color2 || color2 == color3);
});

jQuery.validator.addMethod("checkColor1", function (value, element) {
    color1 = $("#Ball5").val();
    color2 = $("#Ball15").val();
    color3 = $("#Ball25").val();
    return !(color1 == color2 || color1 == color3);
});

window.addEventListener("keydown", function(event) {
    var control = false;
    if(event.target.id === "up"){
        gameKeys[0] = event.code;
        control=true;
      }
    if(event.target.id === "down"){
        gameKeys[1] = event.code;  
        control=true;
      } 
    if(event.target.id === "left"){
        gameKeys[2] = event.code;
        control=true;
      }
      if(event.target.id === "right"){
        gameKeys[3] = event.code;
        control=true;
      }
    if(control)
      event.target.value = event.code;
  }, true);
function privateFunc(val) {
    document.getElementById("BallsNumber").innerHTML = val;
}

function randomNumberOfBalls(){
    var numBalls = '56789';
    var ballsNumber= '';
    for (var i = 0; i < 2; i++) {
        ballsNumber += numBalls[Math.floor(Math.random() * 5)];
    }
    if(ballsNumber<50 || ballsNumber>90){
        var min = Math.ceil(50);
        var max = Math.floor(90);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    else
        return ballsNumber;
}

function randomSettings(){
    $("#up")[0].value="ArrowUp";
    $("#down")[0].value="ArrowDown";
    $("#right")[0].value= "ArrowRight";
    $("#left")[0].value= "ArrowLeft";
    gameKeys[0] = $("#up")[0].value;
    gameKeys[1] = $("#down")[0].value;
    gameKeys[2] = $("#left")[0].value;
    gameKeys[3] = $("#right")[0].value;
    $("#Ball5")[0].value=getRandomColor();
    $("#Ball15")[0].value=getRandomColor();
    $("#Ball25")[0].value=getRandomColor();
    $("#numberOfBalls")[0].value=randomNumberOfBalls();
    $("#gameTime")[0].value = 60 + Math.floor((Math.random() * 100));
    $("#numberOfMonsters")[0].value=  randonNumberOfMonsters();
}

function clearAllSettingsFields(){
    $("#up").val("");
    $("#down").val("");
    $("#left").val("");
    $("#right").val("");
    $("#numberOfBalls").val(50);
    $("#gameTime").val(60);
    $("#numberOfMonsters").val(1);  
  }

function randonNumberOfMonsters(){
    var numMonsters = '1234';
    var monstersNumber='';
    for (var i = 0; i < 1; i++) {
        monstersNumber += numMonsters[Math.floor(Math.random() * 4)];
      }
      return monstersNumber;
}



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  
$().ready(function () {
    $("#fromCommitted").validate();

    $("#setting").validate({
        rules: {
            up: {
                required: true,
                checkKey1: true
            },
            down: {
                required: true,
                checkKey2: true
            },
            left: {
                required: true,
                checkKey3: true
            },
            right: {
                required: true,
                checkKey4: true
            },
            Ball5: {
                checkColor1: true
            },
            Ball15: {
                checkColor2: true
            },
            Ball25: {
                checkColor3: true
            },
        },
        messages: {
            up: {
                required: "Please enter up move key", 
                checkKey1: "Each key should be different"
            },
            down: {
                required: "Please enter down move key",
                checkKey2: "Each key should be different"
            },
            left: {
                required: "Please enter left move key",
                checkKey3: "Each key should be different"
            },
            right: {
                required: "Please enter right move key",
                checkKey4: "Each key should be different"
            },
            Ball5: {
                checkColor1: "Each ball should have a different color"
            },
            Ball15: {
                checkColor2: "Each ball should have a different color"
            },
            Ball25: {
                checkColor3: "Each ball should have a different color"
            }
        },
        submitHandler: function (form, event) {
            colorBalls[0] = $("#Ball5").val();
            colorBalls[1] = $("#Ball15").val();
            colorBalls[2] = $("#Ball25").val();
            ballCount = $("#numberOfBalls").val();
            gameTime = $("#gameTime").val();
            numOfMonsters = $("#numberOfMonsters").val();
            clearAllSettingsFields();
            newGame();
        }
    });
});
