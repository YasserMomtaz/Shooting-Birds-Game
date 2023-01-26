let Level= document.querySelector("option");
localStorage.setItem("Level",Level.value);
if(localStorage.Score==undefined){
    localStorage.setItem("Score",0);
    localStorage.setItem("Name","No user");
}