let gameSeq=[];
let userSeq=[];

let body=document.querySelector('body');
let btns = ["yellow","green","blue","red"];

let start=false;
let level=0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress",function(){
    if(start == false){
        console.log("Game Started!!");
        start = true;

        levelUp();
    }
});


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}


function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(randBtn);
}


let highest = 0;
function updateHighestScore(){
    if(level > highest){
        highest = level;
    }
}

function checkSeq(idx){

    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,800);
        }

    } else{
        updateHighestScore();
        body.style.backgroundColor="red";
        setTimeout(()=> body.style.backgroundColor="white",500);

        h2.innerHTML=`Game Over!!<br> Your Score is <b>${level}</b> <br> Highest Score is <b>${highest} </b><br>Press any Key to start again`;
        reset();
    }
}

function btnPress() {
    let btn = this; 
    btnFlash(btn);

    userColor = btn.getAttribute("id"); //id is created just to assign color to userColor
    userSeq.push(userColor);

    checkSeq(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    start = false;
    level = 0;
    gameSeq=[];
    userSeq=[];
}
