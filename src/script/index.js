/* eslint-disable */
import KEYS from './data/keys.js';
import Line from './components/line.js'

const body = document.querySelector('body');
let state = 0;




// create keyboard

const main = document.createElement('main');
main.classList.add('wrapper');

const textAreaSection = document.createElement('section');
textAreaSection.classList.add('text-area');
const textArea = document.createElement('textarea');
textAreaSection.appendChild(textArea);




const keyBoard = document.createElement('div');
keyBoard.classList.add('key-board');

let line = new Line;

if(KEYS) {
  let count = 0;

  for (let key in KEYS) {

    if (count < 14) {
      line.addKey(key, KEYS[key][state], clickDownKey, clickUpKey);
    }

    if (count === 14) {
      keyBoard.appendChild(line.getLine());
      line = new Line;
    }

    if (count >= 14 && count < 29) {
      line.addKey(key, KEYS[key][state], clickDownKey, clickUpKey);
    }  

    if (count === 29) {
      keyBoard.appendChild(line.getLine());
      line = new Line;
    }

    if (count >= 29 && count < 42) {
      line.addKey(key, KEYS[key][state], clickDownKey, clickUpKey);
    }  
    
    if (count === 42) {
      keyBoard.appendChild(line.getLine());
      line = new Line;
    }

    if (count >= 42 && count < 55) {
      line.addKey(key, KEYS[key][state], clickDownKey, clickUpKey);
    }  
    
    if (count === 55) {
      keyBoard.appendChild(line.getLine());
      line = new Line;
    }

    if (count >= 55) {
      line.addKey(key, KEYS[key][state], clickDownKey, clickUpKey);
    }  

    if (count >= 55) {
      keyBoard.appendChild(line.getLine());
    }
    
    
    count++;

  }
}



main.appendChild(textAreaSection);

main.appendChild(keyBoard);
document.body.appendChild(main);




function clickDownKey() {
    this.classList.add('key_pressed');
    console.log(textArea.selectionStart);
}
function clickUpKey() {
  this.classList.remove('key_pressed');
  console.log(this.dataset.code);

  return false;
}



document.onkeydown  = function (event) {
  clickDownKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
};

document.onkeyup = function (event) {
  clickUpKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
};