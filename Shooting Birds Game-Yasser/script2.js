//to catch needed elemnts on the screen to deal with them later
let StartButton = document.querySelector("input"); 
let NameDiv = document.querySelectorAll("div[class=upperBar]")[0];
let KilledDiv = document.querySelectorAll("div[class=upperBar]")[1];
let ScoreDiv = document.querySelectorAll("div[class=upperBar]")[2];
let TimerDiv = document.querySelectorAll("div[class=upperBar]")[3];

let myBackGroundSound = new Audio('source/Background.mp3');


//taking User name from the URL
const url = window.location.href; 
const searchParams = new URL(url).searchParams; 
const urlSearchParams = new URLSearchParams(searchParams);
const res = Array.from(urlSearchParams.entries());
let UserName = res[0][1];

//the text inside the starting div
document.querySelector("h2").innerText = `Welcome ${UserName}`
document.querySelectorAll("h2")[1].innerText=localStorage.Name+" : "+localStorage.Score;

//initializing the used parameters 
let counter=0;
let timer = 60;
let BirdsKilled=0;

//the text inside the upper divs
NameDiv.innerText=`${res[0][1]}`
KilledDiv.innerText="Birds killed: ";
ScoreDiv.innerText="Score: ";
TimerDiv.innerText="Time: "+timer+" S";

//last score message
if(localStorage.getItem(UserName)!=undefined)
{
  alert(`Hello ${res[0][1]} Your last score was : ${localStorage.getItem(UserName)} \n on ${localStorage.getItem(UserName+"Date")}`)
}

//starting the game event
StartButton.onclick=function(){
    // myBackGroundSound.play(); //optional back ground music can be activiated 
    this.parentElement.parentElement.remove(); // removing the starting div
    let birdObject = new Bird; //creating first bird
    let bombObject = new Bomb; //creating first bomb

    let birdGenerate =setInterval(function(){ //generating new Birds
    birdObject = new Bird;
    },500);

    let bombGenerate =setInterval(function(){ //generating new Bombs
    bombObject = new Bomb;
    },3000);

    let time =setInterval(function(){ //updating timer every 1s
     if(timer>0){
      timer-=1;
      TimerDiv.innerText="Time: "+timer+" S"; //updating text inside timer div
     }
     else{ //stopping the game after timer ends
      clearInterval(time);
      clearInterval(birdGenerate);
      clearInterval(bombGenerate);
      // myBackGroundSound.pause(); //optional back ground music can be activiated 

      localStorage.setItem(`${res[0][1]}`,counter) //saving the user name score and date for his next visit
      let currentDate= new Date().toLocaleString();
      localStorage.setItem(`${res[0][1]}Date`,currentDate);
      
      if(counter>50) //win condition
      {Win();}
      else
      {Lose();}
      DeleteAll(); //deleting all the currnet objects (Birds or Bombs) when the game ends
      if(counter>parseInt(localStorage.Score)) //condition for setting a new High score
      {
        localStorage.setItem("Score",counter);
        localStorage.setItem("Name",res[0][1]);
      }

     }
    },1000);
}


  /* 
          Thank you for your time i hope you enjoyed seeing my small project <3
  */


