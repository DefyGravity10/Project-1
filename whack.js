document.getElementById("finished").style.display="none";                   //Hiding elements not essential for home page
document.getElementById("mainArea").style.display="none";
document.getElementById("isHigh").style.display="none";
document.getElementById("leaderboard").style.display="none";
document.getElementById("gameHeader").style.display="none";

var holes=document.querySelectorAll(".h");                                  //Arrays conatining division objects corresponding to moles, bombs etc
var moles=document.querySelectorAll(".mole");
var super_moles=document.querySelectorAll(".super");
var bombs=document.querySelectorAll(".bomb");

var tempHole;                                                               //To store the latest hole(div) of display
var seconds=0,minutes=0;                                                    //Seconds, minutes variable for the timer
var score=0;                                                                //Score
var peep_maxtime,peep_minTime;                                              //Time bounds for peep action by moles
var diffi;                                                                  //Represents difficulty(1-3)
var highscore=0;                                                            //To store Highscore
var isHigh=false;

var crr=[0,0,0,0,0];                                                        //Used this block to locally store highest score arrays with respect to difficulty selected
var drr=[0,0,0,0,0];
var err=[0,0,0,0,0];
localStorage.setItem("besta",JSON.stringify(crr));
localStorage.setItem("besti",JSON.stringify(drr));
localStorage.setItem("bestl",JSON.stringify(err));

var sound=new Audio();                                                      //Creating audio elements for sound effects in the game
sound.src="whackSound.mp3";
var explode=new Audio();
explode.src="Explosion.mp3";
var sound1=new Audio();
sound1.src="GameOver.mp3";

function Start(a)                                                           //Function for initializing required variables before the game timer starts
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
        highscore=crr[0];
    }
    else if(a==2){
        peep_minTime=500;
        peep_maxtime=900;
        highscore=drr[0];

    }
    else{
        peep_minTime=400;
        peep_maxtime=650;
        highscore=err[0];

    }
}

document.getElementById("game").addEventListener("click",timing);               //Calls function timing(for the timer) when clicked on game board
document.getElementById("game").addEventListener("click",mole_movement);        //Calls function meant for the peeping action of the moles

var timeLimit=1;                                                                //Sets 1 minute time limit for the game

function timing()                                                               // Function for the timer
{
  document.getElementById("game").removeEventListener("click",timing);
  myvar=setInterval(ttiming, 1000);
}

function ttiming(){    
                                                       
  seconds++;

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

function randomT(maxTime,minTime)                                           //Function to return a random time with bounds as mentioned
{
    return Math.floor(Math.random()*(maxTime-minTime)+minTime);
}

function randomHole(holes)                                                  //Function to return a random hole(div) for moles to peep
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

function randomSuperMole(holes)                                             //Function to return a random hole(div) for super moles(moles worth 2 pts)
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

var hole_mole, super_hole, bomb_hole;                                       //Variables store current holes(divs) in which each object would peep through

function mole_movement(){                                                   //Function for peep action

    document.getElementById("game").removeEventListener("click",mole_movement);
    const time=randomT(peep_minTime,peep_maxtime);
    hole_mole=randomHole(holes);
    super_hole=randomSuperMole(holes);
    bomb_hole=randomSuperMole(holes);

    for(var check=0;check<moles.length;check++)                             //Adds event listeners to necessary hit functions when mole is whacked
    {
        moles[check].addEventListener("click",hit);
        super_moles[check].addEventListener("click",superhit);
        bombs[check].addEventListener("click",bomb_hit);
    }

    if(hole_mole==super_hole || hole_mole==bomb_hole || super_hole==bomb_hole)      //Condition so that two moles do not peep from the same hole
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

function hit()                                                                //Function mentions aftermath of whacking a mole
{
    sound.play();
    for(var check=0;check<moles.length;check++)
    {
        moles[check].removeEventListener("click",hit);
    }
    this.classList.remove('play');
    score++;
    document.getElementById("scores").innerHTML=score;
}

function superhit()                                                           //Function mentions afterath of whacking a super mole
{
    sound.play();
    for(var check=0;check<moles.length;check++)
    {
        super_moles[check].removeEventListener("click",superhit);
    }
    this.classList.remove('play2');
    score+=2;
    document.getElementById("scores").innerHTML=score;

}

function bomb_hit()                                                            //Function mentions aftermath of whacking a bomb
{
    explode.play();
    for(var check2=0;check2<moles.length;check2++)
    {
        bombs[check2].removeEventListener("click",bomb_hit);
    }   
    this.classList.remove('playbomb');
    score-=5;
    document.getElementById("scores").innerHTML=score;
}

function finished(){                                                            //Function concerned with display screen after game is over(i.e. 1 minute is passed)
    sound1.play();
    document.getElementById("gameHeader").style.display="none";
    document.getElementById("header").style.display="block";
    document.getElementById("finished").style.display="block";
    document.getElementById("mainArea").style.display="none";

    if(highscore<score)
    {
        highscore=score;
        isHigh=true;
    }

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
    document.getElementById("hscore").innerHTML=highscore;
    performance();
}

var checkrr=[];                                                                 //Array to store 5 highest scores stored in local storage                                                              
  function generate_leaderboard()                                               //Function to generateleaderboard at the end
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

function performance(){                                                     //Function to provide remarks on performance of the player based on the score
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