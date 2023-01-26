function Bird(){ //class for creating and moving the Birds
    //creating new bird
    this.bird = document.createElement("img");
    this.bird.src=`source/bird${Math.round(Math.random()*2+1)}.gif`
    this.bird.classList.add("Bird");
    document.body.append(this.bird);
    this.bird.style.top= Math.floor(Math.random()*(innerHeight-this.bird.height))+"px";
    this.bird.style.left=0+"px";

    moveLeft(this.bird); //moving the new bird

    this.bird.onmousedown=function(){//adding the events for the new bird
      BirdsKilled++;
      if(this.src.split("source/").pop()=="bird2.gif")
      {counter +=10;
        let birdDieSound = new Audio('source/birdkilledblack.mpeg');
        birdDieSound.play();}
      else if(this.src.split("source/").pop()=="bird3.gif")
      {counter+=5;
        let birdDieSound = new Audio('source/birdkilledwhite.mpeg');
        birdDieSound.play();}
      else if(this.src.split("source/").pop()=="bird1.gif")
      {counter-=10;
        let birdDieSound = new Audio('source/birdkilledblue.mpeg');
        birdDieSound.play();}
      console.log(counter);
      ScoreDiv.innerText="Score: "+counter;
      KilledDiv.innerText="Birds killed: "+BirdsKilled;
      this.remove();
    }
}

function Bomb(){ //class for creating and moving the Bombs
    //creating new bomb
    this.bomb = document.createElement("img");
    this.bomb.src=`source/bomb.gif`
    this.bomb.classList.add("Bomb");
    document.body.append(this.bomb);
    this.bomb.style.left= Math.floor(Math.random()*(innerWidth-this.bomb.width))+"px";
    this.bomb.style.top=0+"px";
    
    moveDown(this.bomb); //moving the new bomb

    this.bomb.onclick=function(){//adding the events for the new bomb
      KillSurr(this);
      this.src="source/exp2.gif"
      this.style.width="350px";
      this.style.height="350px";
      this.style.left=parseInt(this.style.left)-60+"px"
      this.style.top= parseInt(this.style.top)-80+"px"
      let currentObj = this;
      let birdDieSound = new Audio('source/bomb.mpeg');
      birdDieSound.play();
      setTimeout(function(){
        Remove(currentObj);
      },500); 
    }
}

const moveLeft=function(imageObject) //Birds movement 
{
  let id =setInterval(function(){
    if(parseInt(imageObject.style.left)+20<innerWidth-imageObject.width)
    {
      imageObject.style.left=parseInt(imageObject.style.left)+10+"px";
    }
    else
    {
          clearInterval(id);
          imageObject.remove();
    }
  },50);
}

const moveDown=function(imageObject) //Bombs movement 
{
  let idBomb =setInterval(function(){
    if(parseInt(imageObject.style.top)+20<innerHeight-imageObject.height)
    {
      imageObject.style.top=parseInt(imageObject.style.top)+5+"px";
    }
    else
    {
          clearInterval(idBomb);
          imageObject.remove();
    }
  },50);
}

const DeleteAll=function(){  //remeve all current objects from the screen
    let CurrentBirds=document.querySelectorAll("img.Bird");
    let CurrentBombs=document.querySelectorAll("img.Bomb");
    for(let i =0;i<CurrentBirds.length;i++)
    {
        CurrentBirds[i].remove();
    }
    for(let i =0;i<CurrentBombs.length;i++)
    {
        CurrentBombs[i].remove();
    }
}

const KillThemAll=function(){ //kill all current Birds on the screen
    let CurrentBirds=document.querySelectorAll("img.Bird")
    for(let i =0;i<CurrentBirds.length;i++)
    {
      BirdsKilled++;
      if(CurrentBirds[i].src.split("source/").pop()=="bird2.gif")
      {counter +=10;}
      else if(CurrentBirds[i].src.split("source/").pop()=="bird3.gif")
      {counter+=5;}
      else if(CurrentBirds[i].src.split("source/").pop()=="bird1.gif")
      {counter-=10;}
      ScoreDiv.innerText="Score: "+counter;
      CurrentBirds[i].remove();
    }
}

const KillSurr=function(imageObject){ //kill all surr birds arround imageObject
    let CurrentBirds=document.querySelectorAll("img.Bird")
    for(let i =0;i<CurrentBirds.length;i++)
    {
      if(Math.abs(((parseInt(CurrentBirds[i].style.left))-parseInt(imageObject.style.left)))<200&&Math.abs(((parseInt(CurrentBirds[i].style.top))-parseInt(imageObject.style.top)))<200)
      {
      BirdsKilled++;
      if(CurrentBirds[i].src.split("source/").pop()=="bird2.gif")
      {counter +=10;}
      else if(CurrentBirds[i].src.split("source/").pop()=="bird3.gif")
      {counter+=5;}
      else if(CurrentBirds[i].src.split("source/").pop()=="bird1.gif")
      {counter-=10;}
      ScoreDiv.innerText="Score: "+counter;
      CurrentBirds[i].remove();
    }
    }
}

const Remove=function(imageObject){
    imageObject.remove();
}

const Win = function(){ // the win condition
    let gameOverDiv = document.createElement("div");
    gameOverDiv.classList.add("GameDive");
    gameOverDiv.innerHTML=` 
    <h2>Congratulation You Win</h2>\n 
    <img src="source/lose.png" alt="win" height="100px" width="100px">\n   
    <h3></h3>\n      
    <h2></h2>\n 
    <button class="styleGameButton" type="button" onClick="window.location.reload()">
    Play Again
    </button>
    <form action="index.html" style="display: inline;">   \n 
    <input class="styleGameButton" type="submit" value="New Player">\n  
    </form>\n`
    gameOverDiv.querySelector("h3").innerText=`Your Score = ${counter}`
    gameOverDiv.querySelectorAll("h2")[1].innerText=`Birds Killed = ${BirdsKilled}`
    document.body.append(gameOverDiv);
}

const Lose = function(){ // the lose condition
    let gameOverDiv = document.createElement("div");
    gameOverDiv.classList.add("GameDive");
    gameOverDiv.innerHTML=` 
    <h2>Unfortunately You Lose</h2>\n 
    <img src="source/win3.png" alt="lose" height="200px" width="200px">\n   
    <h3></h3>\n      
    <h2></h2>\n 
    <button class="styleGameButton" type="button" onClick="window.location.reload()">
    Play Again
    </button>
    <form action="index.html" style="display: inline;">   \n 
    <input class="styleGameButton" type="submit" value="New Player">\n  
    </form>\n`
    gameOverDiv.querySelector("h3").innerText=`Your Score = ${counter}`
    gameOverDiv.querySelectorAll("h2")[1].innerText=`Birds Killed = ${BirdsKilled}`
    document.body.append(gameOverDiv);
}
  