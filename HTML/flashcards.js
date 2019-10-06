var words = [];
var defins = [];
var starred = [];
let flashNumber = 0;
let type = true;
let screen = 0;
var answer = 0;
var onlyStarred = false;
let def = [];
var store = [];
let timer = 50;

function init(){
  if(localStorage.getItem('words')!==null){
    words=localStorage.getItem('words').split("spacingForThisToWork");
  }
  if(localStorage.getItem('defins')!==null){
    defins=localStorage.getItem('defins').split("spacingForThisToWork");
  }
  if(localStorage.getItem('starred')!==null){
    starred=localStorage.getItem('starred').split("spacingForThisToWork");
  }
}
init();
function saveData(){
  localStorage.setItem('words',words.join("spacingForThisToWork"));
  localStorage.setItem('defins',defins.join("spacingForThisToWork"));
  localStorage.setItem('starred',starred.join("spacingForThisToWork"));
}

function draw(){
  background(255)
  fill(0)
  if(screen===0){
    textSize(40);
    text("Review",300-(ctx.measureText("Review").width/2),100)
    text("Quiz",300-(ctx.measureText("Quiz").width/2),300)
    text(onlyStarred?"Only Starred":"Everything",300-(ctx.measureText("Only Starred").width/2),500)
  }else if(screen===1){
    let star = false;
    for(let i = 0;i<starred.length;i++){
      if(starred[i]===words[flashNumber]){
        star=true;
      }
    }
    textSize(20);
    if(star){
      background(235,220,0)
      text("unstar",290,20)
    }else{
      text("star",293,20)
    }
    triangle(10,300,50,330,50,270)
    triangle(590,300,550,330,550,270)
    if(type){
      textSize(40);
      text(words[flashNumber],300-(ctx.measureText(words[flashNumber]).width/2),300);
    }else{
      textSize(20);
      if(300-(ctx.measureText(defins[flashNumber]).width/2)<50){
        let words = defins[flashNumber].split(" ");
        for(let i = 0;i<4;i++){
          text(words.slice(floor(i*(words.length/4)),floor((i+1)*(words.length/4))).join(" "),300-(ctx.measureText(defins[flashNumber]).width/8),280+(i*20));
        }

      }else{
        text(defins[flashNumber],300-(ctx.measureText(defins[flashNumber]).width/2),300);
      }
    }
  }else if(screen===2){
    if(onlyStarred){
      words=store;
      onlyStarred=false;
    }
    if(type){
      answer = floor(random(0,3));
      flashNumber=floor(random(0,words.length));
      type=false;
      def=[];
      timer=50;
      for(let i = 0;i<3;i++){
        if(i===answer){
          def.push(defins[flashNumber]);
        }else{
          let randomChoice = floor(random(0,words.length));
          while(randomChoice===answer){
            randomChoice = floor(random(0,words.length));
          }
          def.push(defins[randomChoice]);
        }
      }
    }
    textSize(40);
    text(words[flashNumber],150,150)
    textSize(10);
    for(let i = 0;i<3;i++){
      text(def[i],0,350+(i*100));
    }
  }else if(screen===3){
    timer--;
    if(def===answer){
      background(0,255,0)
    }else{
      background(255,0,0)
    }
    if(timer<=0){
      type=true;
      screen=2;
    }
  }
}

function mouseReleased(){
  if(screen===0){
    if(mouseY<200){
      screen=1;
    }else if(mouseY<400){
      screen=2;
    }else{
      onlyStarred=!onlyStarred;
      if(onlyStarred){
        store = words;
        words = starred;
      }else{
        words = store;
      }
    }
  }else if(screen===1){
    if(mouseY<30 && !onlyStarred){
      let star = false;
      for(let i = 0;i<starred.length;i++){
        if(starred[i]===words[flashNumber]){
          star=true;
        }
      }
      if(star){
        starred=starred.filter(function(value,index,arr){
          return value!==words[flashNumber];
        });
        saveData();
      }else{
        starred.push(words[flashNumber]);
        saveData();
      }
    }else
    if(mouseX<50){
      if(flashNumber>0){
        flashNumber--;
      }
    }else if(mouseX>550){
      if(flashNumber<words.length-1){
        flashNumber++;
      }
    }else{
      type=!type;
    }
  }else if(screen===2){
    if(mouseY>500){
      screen=3;
      def=2;
    }else if(mouseY>400){
      screen=3;
      def=1;
    }else if(mouseY>300){
      screen=3;
      def=0;
    }
  }
}
