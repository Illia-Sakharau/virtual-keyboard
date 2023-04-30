/* eslint-disable */
import KEYS from './data/keys.js';
import Line from './components/line.js';
import CreateKeyboard from './components/keyboard.js';

let state = 0;

const body = document.querySelector('body');
const template = `
<header class="wrapper">
        <h1>Virtual Keyboard</h1>
    </header>
    <main class="wrapper">

    </main>
    <footer class="wrapper">
        <p class="description">Клавиатура создана в операционной системе Windows</p>
        <p class="description">Для переключения языка комбинация: левыe ctrl + alt</p>
    </footer>
`
document.body.innerHTML = template;

const main = document.querySelector('main');
const textAreaSection = document.createElement('section');
const textArea = document.createElement('textarea');

main.classList.add('wrapper');

textAreaSection.classList.add('text-area');

textAreaSection.appendChild(textArea);
main.appendChild(textAreaSection);
main.appendChild(CreateKeyboard(state, clickDownKey, clickUpKey));


function modificateText(step, char) {
  const startPos = textArea.selectionStart;
  const endPos = textArea.selectionEnd;
  const scrollTop = textArea.scrollTop;

  if (char === 'Backspace') {
    textArea.value = textArea.value.substring(0, startPos + step) + textArea.value.substring(endPos, textArea.value.length);
  } else if (char === 'Delete') {
    textArea.value = textArea.value.substring(0, startPos) + textArea.value.substring(endPos + 1, textArea.value.length);
  } else {
    textArea.value = textArea.value.substring(0, startPos) + char + textArea.value.substring(endPos, textArea.value.length);
  }
  

  textArea.selectionStart = startPos + step;
  textArea.selectionEnd = startPos + step;
  textArea.scrollTop = scrollTop;
}

function reverseCase(key) {


  if(key.dataset.code === 'CapsLock') {
    key.classList.toggle('key_active');
  };
  
  if (state % 2 === 0) {
    state++;
  } else {
    state--;
  }

  for (let key in KEYS) {
    document.querySelector(`.key[data-code="${key}"]`).textContent = KEYS[key][4] || KEYS[key][state];
  }
}


function clickDownKey() {
  event.preventDefault();

  this.classList.add('key_pressed');

  if (KEYS[this.dataset.code][state]) {   //если нажат символ
    modificateText(1, KEYS[this.dataset.code][state]);
  }
  if (this.dataset.code === 'Backspace') {    //если нажат Backspace
    modificateText(-1, 'Backspace');
  }
  if (this.dataset.code === 'Delete') {    //если нажат Delete
    modificateText(0, 'Delete');
  }
  if (this.dataset.code === 'CapsLock' && !event.repeat) {    //если нажат CapsLock
    reverseCase(this);
  }
  if ((this.dataset.code === 'ShiftLeft' || this.dataset.code === 'ShiftRight') && !event.repeat) {    //если нажат Shift
    reverseCase(this);
  }

}

function clickUpKey() {
this.classList.remove('key_pressed');

if (this.dataset.code === 'ShiftLeft' || this.dataset.code === 'ShiftRight') {    //если отпущен Shift
  reverseCase(this);
}

return false;
}



document.onkeydown  = function (event) {
clickDownKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
};

document.onkeyup = function (event) {
clickUpKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
};