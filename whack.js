document.getElementById("incorrect").style.display="none";                  
document.getElementById("finished").style.display="none";
document.getElementById("stats").style.display="none";

var holes=document.querySelectorAll(".h");
var moles=document.querySelectorAll(".mole");
var super_moles=document.querySelectorAll(".super");
var tempHole;
var seconds=0,minutes=0;
var score=0;

function Start()
{
    document.getElementById("home").style.display="none";
    document.getElementById("stats").style.display="block";
}

document.getElementById("game").addEventListener("click",timing);
document.getElementById("game").addEventListener("click",mole_movement);

var timeLimit=1;

function timing()                                                           
{
  myvar=setInterval(ttiming, 1000);
}

function ttiming(){                                                         
  seconds++;
  document.getElementById("game").removeEventListener("click",timing);

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
    

function mole_movement(){
    const time=randomT(500,1000);
    const hole=randomHole(holes);
    const super_hole=randomSuperMole(holes);

    for(var check=0;check<moles.length;check++)
    {
        moles[check].addEventListener("click",hit);
        super_moles[check].addEventListener("click",superhit);
    }

    document.getElementById("game").removeEventListener("click",mole_movement);

    if(hole==super_hole)
    {
        mole_movement();
    }
    else{
        hole.classList.add('play');
        super_hole.classList.add('play2');
    

    setTimeout(()=> {
        hole.classList.remove('play');
        super_hole.classList.remove('play2');
        if(minutes<timeLimit)
          mole_movement();
    },time*1);
}}
