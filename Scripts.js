"use strict";

// Elements of documents
const rod1 = document.querySelector('.Bar-one');
const rod2 = document.querySelector('.Bar-two');
const ball = document.querySelector('.ball');
const playBtn = document.querySelector('.play');

// Intervals for Rod and balls
var setIntervalRod;
var setIntervalBalls;

// Classes for animation of balls
const animateTopLeft = "animate-top-left";
const animateTopRight = "animate-top-right";
const animateBotttomLeft = "animate-bottom-left";
const animateBotttomRight = "animate-bottom-right";


// User variables
const user1 = "User1";
const user2 = "User2";

let gameStarted = false;
// Functions
function startPlay()
{
    playBtn.style.visibility = "hidden";
    playBtn.style.zIndex = '0';
    ball.classList.add(animateTopRight);
    moveBalls();
}

document.addEventListener('keydown',(event)=>{
    console.log(event.keyCode);
    switch(event.keyCode)
    {
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
        case(13):
        {
            if(gameStarted)
            {
                break;
            }
            gameStarted = true;
            startPlay();
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
                endGame(user1);
                return;
            }
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
                endGame(user2);
                return;
            }

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
    },1);
}

function removeAllClassFromBall()
{
    ball.classList.remove(animateBotttomLeft);
    ball.classList.remove(animateBotttomRight);
    ball.classList.remove(animateTopLeft);
    ball.classList.remove(animateTopRight);
}

function endGame(user)
{
    clearInterval(setIntervalBalls);
    clearInterval(setIntervalRod);
    removeAllClassFromBall();
    resetAllElements();
    window.alert(user + "Lost !");
    return;
}

function moveRod(direction)
{
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
    playBtn.style.left = (window.innerWidth/2 - playBtn.offsetWidth/2) + "px";
    playBtn.style.top = (window.innerHeight/2 - playBtn.offsetHeight/2) + "px";
    playBtn.style.visibility = "visible";
    playBtn.style.zIndex = 2;
    rod1.style.left = (window.innerWidth/2 - rod1.offsetWidth/2) + "px";
    rod2.style.left = (window.innerWidth/2 - rod2.offsetWidth/2) + "px";
    ball.style.left = (window.innerWidth/2 - ball.offsetWidth/2) + "px";
    ball.style.top = (window.innerHeight/2 - ball.offsetHeight/2) + "px";
}