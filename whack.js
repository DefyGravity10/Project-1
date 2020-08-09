document.getElementById("finished").style.display="none";
document.getElementById("mainArea").style.display="none";
document.getElementById("isHigh").style.display="none";
document.getElementById("leaderboard").style.display="none";
document.getElementById("gameHeader").style.display="none";

var holes=document.querySelectorAll(".h");
var moles=document.querySelectorAll(".mole");
var super_moles=document.querySelectorAll(".super");
var bombs=document.querySelectorAll(".bomb");

var tempHole;
var seconds=0,minutes=0;
var score=0;
var peep_maxtime,peep_minTime;
var diffi;
var highscore=0;
var isHigh=false;

var crr=[0,0,0,0,0];
var drr=[0,0,0,0,0];
var err=[0,0,0,0,0];
localStorage.setItem("besta",JSON.stringify(crr));
localStorage.setItem("besti",JSON.stringify(drr));
localStorage.setItem("bestl",JSON.stringify(err));

function Start(a)
{
    document.getElementById("gameHeader").style.display="block";
    diffi=a;
    document.getElementById("home").style.display="none";
    document.getElementById("mainArea").style.display="block";
    document.getElementById("header").style.display="none";
    if(a==1)
    {
        peep_minTime=600;
        peep_maxtime=1500;
    }
    else if(a==2){
        peep_minTime=500;
        peep_maxtime=900;
    }
    else{
        peep_minTime=400;
        peep_maxtime=650;
    }
}

document.getElementById("game").addEventListener("click",timing);
document.getElementById("game").addEventListener("click",mole_movement);

var timeLimit=1;

function timing()                                                           
{
  myvar=setInterval(ttiming, 1000);
}

function ttiming(){    
  document.getElementById("game").removeEventListener("click",timing);                                                     
  seconds++;
  if(highscore<score)
  {
      highscore=score;
      isHigh=true;
  }
  document.getElementById("highscore").innerHTML=highscore;

  if(seconds==60)
  {
      seconds=0;
      minutes++;
  }
  if(seconds<10)
  {
  document.getElementById("seconds").innerHTML=0+""+seconds;
  }
  else{
    document.getElementById("seconds").innerHTML=seconds;
  }
  document.getElementById("minutes").innerHTML=0+""+minutes;
  if(minutes==1)                                                             
  {
      clearInterval(myvar);                                                  
      finished();                                                            
  }
}

function stop_timing()                                                       
{
  clearInterval(myvar);
}

function randomT(maxTime,minTime)
{
    return Math.floor(Math.random()*(maxTime-minTime)+minTime);
}

function randomHole(holes)
{
    var index=Math.floor(Math.random()*holes.length);
    const hole=holes[index];
    if(hole==tempHole)
    {
        return randomHole(holes);
    }
    tempHole=hole;
    return hole;
}

var lastSuperHole;

function randomSuperMole(holes)
{
    var superIndex=Math.floor(Math.random()*holes.length);
    const superMole=holes[superIndex];
    if(superMole==lastSuperHole)
    {
        return randomSuperMole(holes);
    }
    lastSuperHole=superMole;
    return superMole;
}

var hole_mole, super_hole, bomb_hole;

function mole_movement(){

    document.getElementById("game").removeEventListener("click",mole_movement);
    const time=randomT(peep_minTime,peep_maxtime);
    hole_mole=randomHole(holes);
    super_hole=randomSuperMole(holes);
    bomb_hole=randomSuperMole(holes);

    for(var check=0;check<moles.length;check++)
    {
        moles[check].addEventListener("click",hit);
        super_moles[check].addEventListener("click",superhit);
        bombs[check].addEventListener("click",bomb_hit);
    }

    if(hole_mole==super_hole || hole_mole==bomb_hole || super_hole==bomb_hole)
    {
        mole_movement();
    }
    else{
        hole_mole.classList.add('play');
        super_hole.classList.add('play2');
        bomb_hole.classList.add('playbomb');

    setTimeout(()=> {
        hole_mole.classList.remove('play');
        super_hole.classList.remove('play2');
        bomb_hole.classList.remove('playbomb');
        if(minutes<timeLimit)
          mole_movement();
    },time*1);
}}

function hit()
{
    for(var check=0;check<moles.length;check++)
    {
        moles[check].removeEventListener("click",hit);
    }
    this.classList.remove('play');
    score++;
    document.getElementById("scores").innerHTML=score;
}

function superhit()
{
    for(var check=0;check<moles.length;check++)
    {
        super_moles[check].removeEventListener("click",superhit);
    }
    this.classList.remove('play2');
    score+=2;
    document.getElementById("scores").innerHTML=score;

}

function bomb_hit()
{
    for(var check2=0;check2<moles.length;check2++)
    {
        bombs[check2].removeEventListener("click",bomb_hit);
    }   
    this.classList.remove('playbomb');
    score-=5;
    document.getElementById("scores").innerHTML=score;
}

function finished(){
    document.getElementById("gameHeader").style.display="none";
    document.getElementById("header").style.display="block";
    document.getElementById("finished").style.display="block";
    document.getElementById("mainArea").style.display="none";
    if(isHigh==true)
    {
        document.getElementById("isHigh").style.display="block";
    }

    if(diffi==1)
    {
        document.getElementById("level").innerHTML="Amateur Level";
    }
    else if(diffi==2)
    {
        document.getElementById("level").innerHTML="Intermediate Level";
    }
    else{
        document.getElementById("level").innerHTML="Legendary Level";
    }
    performance();
}

var checkrr=[];                                                             
  function generate_leaderboard()                                             
  {
    document.getElementById("finished").style.display="none";
    document.getElementById("leaderboard").style.display="block";
    document.getElementById("isHigh").style.display="none";
    if(diffi==1)                                                               
    {
      checkrr=JSON.parse(localStorage.getItem("besta"));                     
      checkrr.push(score);                                      
      checkrr.sort(function(a, b){return b - a});
      checkrr.pop();
      localStorage.setItem("besta",JSON.stringify(checkrr));                  
    }
    else if(diffi==2)
    {
      checkrr=JSON.parse(localStorage.getItem("besti"));
      checkrr.push(score);
      checkrr.sort(function(a, b){return b - a});
      checkrr.pop();
      localStorage.setItem("besti",JSON.stringify(checkrr));
    }
    else
    {
      checkrr=JSON.parse(localStorage.getItem("bestl"));
      checkrr.push(score);
      checkrr.sort(function(a, b){return b - a});
      checkrr.pop();
      localStorage.setItem("bestl",JSON.stringify(checkrr));
    }   
    for(var l=0;l<5;l++)                                                   
    {
      document.getElementById("00"+l).innerHTML=checkrr[l];
    }
  }

function performance(){
    if(score>60)
    {
        document.getElementById("performance").innerHTML="GODLIKE";
    }
    else if(score>50 && score<=60)
    {
        document.getElementById("performance").innerHTML="EXCELLENT";
    }
    else if(score>40 && score<=50)
    {
        document.getElementById("performance").innerHTML="VERY GOOD";
    }
    else if(score>30 && score<=40)
    {
        document.getElementById("performance").innerHTML="GOOD";
    }
    else if(score>20 && score<=30)
    {
        document.getElementById("performance").innerHTML="MEH...";
    }
    else{
        document.getElementById("performance").innerHTML="I hope you were AFK!";
    }
}