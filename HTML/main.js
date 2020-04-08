let text = document.getElementById("definition");
let defs = [];
var defins = {};

function init(){
  if(localStorage.getItem('definitions')!==null){
    console.log(localStorage.getItem('definitions'));
    defins = localStorage.getItem('defins');
  }
  console.log(defins);
}
init();


function saveData(){
  localStorage.setItem('definitions', JSON.stringify(defins));
}

function getDictionary(word){
  defs=[];
  let request = new XMLHttpRequest();
  request.open('GET','https://googledictionaryapi.eu-gb.mybluemix.net/?define='+word.toLowerCase()+'&lang=en',true);
  request.onload = function(){
    let data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      for(let i = 0;i<data.length;i++){
        for(let j = 0;j<Object.keys(data[i].meaning).length;j++){
          let definitions = data[i].meaning[Object.keys(data[i].meaning)[j]];
          for(let k = 0;k<definitions.length;k++){
            defs.push(definitions[k].definition);
          }
        }
      }
      if(window.location.pathname.includes("index")){
        displayDefinition();
      }else{
        addWord(word,defs[0])
        alert(defs[0]);
      }
    } else {
      console.log('error')
      alert('not a word or does not exist');
    }
  }
  request.send();
}

//handle displaying buttons
function displayDefinition(){
  while (text.hasChildNodes()) {
    text.removeChild(text.firstChild);
  }
  for(let d = 0;d<defs.length;d++){
    if(defs[d]!==undefined && defs[d]!==null){
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let button = document.createElement("button");
      button.style.animation = 'defAnim 1s';
      button.innerHTML = defs[d];
      button.onclick = function(){
        addWord(document.getElementById("word").value,defs[d]);
        while (text.hasChildNodes()) {
          text.removeChild(text.firstChild);
        }
        document.getElementById('word').value="";
      };
      td.appendChild(button);
      tr.appendChild(td);
      text.appendChild(tr);
    }
  }
}

//add word to array
function addWord(word,definition){
  let exists = false;
  for(let i = 0;i<Object.values(defins).length;i++){
    if(definition===Object.values(defins)[i]){
      exists=true;
    }
  }
  if(!exists){
    defins[word] = definition;
    saveData();
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
  getDictionary(text);
}
