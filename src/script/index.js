import KEYS from './data/keys.js';
import CreateKeyboard from './components/keyboard.js';

let state = +localStorage.getItem('state') || 0;

const template = `
<header class="wrapper">
        <h1>Virtual Keyboard</h1>
    </header>
    <main class="wrapper">

    </main>
    <footer class="wrapper">
        <p class="description">Клавиатура создана в операционной системе Windows</p>
        <p class="description">Для переключения языка комбинация: ctrl + левыe alt</p>
    </footer>
`;
document.body.innerHTML = template;

const main = document.querySelector('main');
const textAreaSection = document.createElement('section');
const textArea = document.createElement('textarea');

function modificateText(step, char) {
  const startPos = textArea.selectionStart;
  const endPos = textArea.selectionEnd;
  const { scrollTop } = textArea;

  if (char === 'Backspace') {
    textArea.value = textArea
      .value.substring(0, startPos - 1) + textArea.value.substring(endPos, textArea.value.length);
  } else if (char === 'Delete') {
    textArea.value = textArea
      .value.substring(0, startPos) + textArea.value.substring(endPos + 1, textArea.value.length);
  } else {
    textArea.value = textArea
      .value
      .substring(0, startPos) + char + textArea.value.substring(endPos, textArea.value.length);
  }

  textArea.selectionStart = startPos + step;
  textArea.selectionEnd = startPos + step;
  textArea.scrollTop = scrollTop;
}

function reverseCase(key) {
  if (key.dataset.code === 'CapsLock') {
    key.classList.toggle('key_active');
  }

  if (state % 2 === 0) {
    state += 1;
    localStorage.setItem('state', state);
  } else {
    state -= 1;
    localStorage.setItem('state', state);
  }

  Object.entries(KEYS).forEach((element) => {
    document.querySelector(`.key[data-code="${element[0]}"]`).textContent = element[1][4] || element[1][state];
  });
}

function switchLanguage() {
  if (state < 2) {
    state += 2;
    localStorage.setItem('state', state);
  } else {
    state -= 2;
    localStorage.setItem('state', state);
  }

  Object.entries(KEYS).forEach((element) => {
    document.querySelector(`.key[data-code="${element[0]}"]`).textContent = element[1][4] || element[1][state];
  });
}

function clickDownKey() {
  this.classList.add('key_pressed');

  if (KEYS[this.dataset.code][state]) { // если нажат символ
    modificateText(1, KEYS[this.dataset.code][state]);
  }
  if (this.dataset.code === 'Backspace') { // если нажат Backspace
    modificateText(-1, 'Backspace');
  }
  if (this.dataset.code === 'Delete') { // если нажат Delete
    modificateText(0, 'Delete');
  }
  if (this.dataset.code === 'CapsLock') { // если нажат CapsLock
    reverseCase(this);
  }
  if (this.dataset.code === 'ShiftLeft' || this.dataset.code === 'ShiftRight') { // если нажат Shift
    reverseCase(this);
  }
}

function clickUpKey() {
  this.classList.remove('key_pressed');

  if (this.dataset.code === 'ShiftLeft' || this.dataset.code === 'ShiftRight') { // если отпущен Shift
    reverseCase(this);
  }

  return false;
}

main.classList.add('wrapper');

textAreaSection.classList.add('text-area');

textAreaSection.appendChild(textArea);
main.appendChild(textAreaSection);
main.appendChild(CreateKeyboard(state, clickDownKey, clickUpKey));

if (state % 2 === 1) {
  document.querySelector('.key[data-code="CapsLock"]').classList.toggle('key_active');
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.code === 'AltLeft') switchLanguage();
  event.preventDefault();
  if ((event.code === 'CapsLock' || event.code === 'ShiftLeft' || event.code === 'ShiftRight') && event.repeat) return;
  clickDownKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
});

document.addEventListener('keyup', (event) => {
  clickUpKey.call(document.querySelector(`.key[data-code="${event.code}"]`));
});
