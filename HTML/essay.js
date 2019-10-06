let text = document.getElementById("definition");
let word = "";
let defs = [];
var words = [];
var defins = [];

function init(){
  if(localStorage.getItem('words')!==null){
    words=localStorage.getItem('words').split("spacingForThisToWork");
  }
  if(localStorage.getItem('defins')!==null){
    defins=localStorage.getItem('defins').split("spacingForThisToWork");
  }
}
init();


function saveData(){
  localStorage.setItem('words',words.join("spacingForThisToWork"));
  localStorage.setItem('defins',defins.join("spacingForThisToWork"));
}

function getDictionary(word){
  defs=[];
  let request = new XMLHttpRequest();
  request.open('GET','https://googledictionaryapi.eu-gb.mybluemix.net/?define='+word+'&lang=en',true);
  request.onload = function(){
    let data = JSON.parse(this.response);
    console.log(data);
    if (request.status >= 200 && request.status < 400) {
      for(let i = 0;i<data.length;i++){
        for(let j = 0;j<Object.keys(data[i].meaning).length;j++){
          let definitions = data[i].meaning[Object.keys(data[i].meaning)[j]];
          for(let k = 0;k<definitions.length;k++){
            if(definitions[k].synonyms!==undefined){
              for(let l = 0;l<definitions[k].synonyms.length;l++){
                defs.push(definitions[k].synonyms[l]);
              }
            }
          }
        }
      }
      defs=defs.filter(function(element){
        return element!==word;
      })
      displayDefinition();
    } else {
      console.log('error')
      alert('not a word or not found');
    }
  }
  request.send();
}

//handle displaying buttons
function displayDefinition(){
  console.log(defs);
  while (text.hasChildNodes()) {
    text.removeChild(text.firstChild);
  }
  for(let d = 0;d<defs.length;d++){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let button = document.createElement("button");
    for(let i = 0;i<words.length;i++){
      if(defs[d]===words[i]){
        button.id="color";
      }
    }
    button.innerHTML = defs[d];
    button.onclick = function(){
      document.getElementById("word").value = document.getElementById("word").value.replace(word,defs[d]);
      while (text.hasChildNodes()) {
        text.removeChild(text.firstChild);
      }
    };
    td.appendChild(button);
    tr.appendChild(td);
    text.appendChild(tr);
  }
}

//get selected word
function getSelectedWord(){
  let text = "";
  if (window.getSelection) {
      text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
  }
  word=text;
  getDictionary(text);
}
