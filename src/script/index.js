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




function clickDownKey() {
  this.classList.add('key_pressed');
  
  const startPos = textArea.selectionStart;
  const endPos = textArea.selectionEnd;
  const scrollTop = textArea.scrollTop;

  textArea.value = textArea.value.substring(0, startPos) + KEYS[this.dataset.code][state] + textArea.value.substring(endPos, textArea.value.length);

  textArea.selectionStart = startPos + 1;
  textArea.selectionEnd = startPos + 1;

  event.preventDefault();
}

function clickUpKey() {
this.classList.remove('key_pressed');

return false;
}



document.onkeydown  = function (event) {
clickDownKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
};

document.onkeyup = function (event) {
clickUpKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
};