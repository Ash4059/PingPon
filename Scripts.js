"use strict";

// Elements of documents
const rod1 = document.querySelector('.Bar-one');
const rod2 = document.querySelector('.Bar-two');
const ball = document.querySelector('.ball');
const startPlayContainer = document.querySelector('.firstPlayContainer');
const restartEndGame = document.querySelector('.restartEndGame');

// Intervals for Rod and balls
var setIntervalRod;
var setIntervalBalls;

// Classes for animation of balls
const animateTopLeft = "animate-top-left";
const animateTopRight = "animate-top-right";
const animateBotttomLeft = "animate-bottom-left";
const animateBotttomRight = "animate-bottom-right";

// User Info
var current_score =
{
    first: 0,
    second: 0,
};
var UserName =
{
    first: "",
    second: ""
};
var maxScore = 
{
    first:0,
    second:0
}

let gameStarted = false;
// Functions
function startPlay()
{
    if(gameStarted)
    {
        return;
    }
    const user1 = document.querySelector("#user1");
    const user2 = document.querySelector("#user2");
    if(user1.value == "" || user2.value == "")
    {
        window.alert("Please enter users name");
        return;
    }
    UserName.first = user1.value;
    UserName.second = user2.value;
    gameStarted = true;
    startPlayContainer.style.visibility = "hidden";
    startPlayContainer.style.zIndex = '0';
    ball.classList.add(animateTopRight);
    moveBalls();
}

document.addEventListener('keydown',(event)=>{
    
    switch(event.keyCode)
    {
        case(13):
        {
            startPlay();
            break;
        }
        case(65):
        {
            moveRod("left");
            break;
        }
        case(37):
        {
            moveRod("left");
            break;
        }
        case(39):
        {
            moveRod("right");
            break;
        }
        case(68):
        {
            moveRod("right");
            break;
        }
        default:
        {
            moveRod("stop");
        }
    }
})

function moveBalls()
{
    setIntervalBalls = setInterval(()=>{
        let ballLeft = ball.getBoundingClientRect().left;
        let ballTop = ball.getBoundingClientRect().top;
        if(ballTop <= rod1.offsetHeight)
        {
            if((ballLeft<rod1.offsetLeft) || (ballLeft>(rod1.offsetWidth+rod1.offsetLeft)))
            {
                restart();
                return;
            }
            else if(ballLeft >= rod1.offsetLeft || ballLeft <= (rod1.offsetWidth + rod1.offsetLeft))
            {
                current_score.first++;
            }
            
            console.log(current_score.first,current_score.second);
            if(ball.classList.contains(animateTopLeft))
            {
                ball.classList.remove(animateTopLeft);
                ball.classList.add(animateBotttomLeft);
            }
            else if(ball.classList.contains(animateTopRight))
            {
                ball.classList.remove(animateTopRight);
                ball.classList.add(animateBotttomRight);
            }
        }
        else if(ballTop > ( window.innerHeight - rod2.offsetHeight - ball.offsetHeight))
        {
            if((ballLeft<rod1.offsetLeft) || (ballLeft>(rod1.offsetWidth+rod1.offsetLeft)))
            {
                restart();
                return;
            }
            else if(ballLeft >= rod1.offsetLeft || ball <= (rod2.offsetWidth + rod2.offsetLeft))
            {
                current_score.second++;
            }
            
            console.log(current_score.first,current_score.second);
            if(ball.classList.contains(animateBotttomRight))
            {
                ball.classList.remove(animateBotttomRight);
                ball.classList.add(animateTopRight);
            }
            else if(ball.classList.contains(animateBotttomLeft))
            {
                ball.classList.remove(animateBotttomLeft);
                ball.classList.add(animateTopLeft);
            }
        }
        else if(ballLeft <= 0)
        {
            if(ball.classList.contains(animateTopLeft))
            {
                ball.classList.remove(animateTopLeft);
                ball.classList.add(animateTopRight);
            }
            else if(ball.classList.contains(animateBotttomLeft))
            {
                ball.classList.remove(animateBotttomLeft);
                ball.classList.add(animateBotttomRight);
            }
        }
        else if((ballLeft + ball.offsetWidth) >= window.innerWidth)
        {
            if(ball.classList.contains(animateTopRight))
            {
                ball.classList.remove(animateTopRight);
                ball.classList.add(animateTopLeft);
            }
            else if(ball.classList.contains(animateBotttomRight));
            {
                ball.classList.remove(animateBotttomRight);
                ball.classList.add(animateBotttomLeft);
            }
        }
        
    },2);
}

function removeAllClassFromBall()
{
    ball.classList.remove(animateBotttomLeft);
    ball.classList.remove(animateBotttomRight);
    ball.classList.remove(animateTopLeft);
    ball.classList.remove(animateTopRight);
}

function restart()
{
    clearInterval(setIntervalBalls);
    clearInterval(setIntervalRod);
    removeAllClassFromBall();
    maxScore.first = Math.max(maxScore.first,current_score.first);
    maxScore.second = Math.max(maxScore.second,current_score.second);
    moveRodToCentral();
    if(current_score.first > current_score.second)
    {
        window.alert(UserName.first + " is won!");
    }
    else
    {
        window.alert(UserName.second + " is won!");
    }
    restartEndGame.style.left = (window.innerWidth/2 - restartEndGame.offsetWidth/2) + "px";
    restartEndGame.style.top = (window.innerHeight/2 - restartEndGame.offsetHeight/2) + "px";
    restartEndGame.style.visibility = "visible";
    restartEndGame.style.zIndex = 2;
}

function restartGame()
{
    restartEndGame.style.visibility = "hidden";
    restartEndGame.style.zIndex = 0;
    gameStarted = false;
    startPlay();
}

function endGame()
{
    resetAllElements();
    current_score.first = 0;
    current_score.second = 0;
    UserName.first = "";
    UserName.second = "";
    window.alert("Max score of " + UserName.first + " is " + maxScore.first + ". Max score of " + UserName.second + " is " + maxScore.second);
    maxScore.first = 0;
    maxScore.second = 0;
    return;
}

function moveRod(direction)
{
    if(!gameStarted)
    {
        return;
    }
    clearInterval(setIntervalRod);
    if(direction == "left")
    {
        setIntervalRod = setInterval(()=>{
            let rodPosition = rod1.offsetLeft;
            if(rodPosition - 4 < 0)
            {
                rod1.style.left = "0px";
                rod2.style.left = "0px";
                clearInterval(setIntervalRod);
            }
            else
            {
                rodPosition -= 4;
                rod1.style.left = rodPosition + "px";
                rod2.style.left = rodPosition + "px";
            }
        },20);
    }
    else if(direction == "stop")
    {
        clearInterval("stop");
    }
    else
    {
        setIntervalRod = setInterval(()=>{
            let rodPosition = rod1.offsetLeft;
            if(rodPosition + rod1.offsetWidth + 4 >= window.innerWidth)
            {
                rod1.style.left = (window.innerWidth - rod1.offsetWidth - 2) + "px";
                rod2.style.left = (window.innerWidth - rod2.offsetWidth - 2) + "px";
                clearInterval(setIntervalRod);
            }
            else
            {
                rodPosition += 4;
                rod1.style.left = rodPosition + "px";
                rod2.style.left = rodPosition + "px";
            }
        },20);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    resetAllElements();
});

function resetAllElements()
{
    gameStarted = false;
    restartEndGame.style.visibility = "hidden";
    restartEndGame.style.zIndex = 0;
    startPlayContainer.style.left = (window.innerWidth/2 - startPlayContainer.offsetWidth/2) + "px";
    startPlayContainer.style.top = (window.innerHeight/2 - startPlayContainer.offsetHeight/2) + "px";
    startPlayContainer.style.visibility = "visible";
    startPlayContainer.style.zIndex = 2;
    moveRodToCentral();
}

function moveRodToCentral()
{
    rod1.style.left = (window.innerWidth/2 - rod1.offsetWidth/2) + "px";
    rod2.style.left = (window.innerWidth/2 - rod2.offsetWidth/2) + "px";
    ball.style.left = (window.innerWidth/2 - ball.offsetWidth/2) + "px";
    ball.style.top = (window.innerHeight/2 - ball.offsetHeight/2) + "px";
}
