import CreateKey from './key.js';

export default class Line {
  constructor() {
    this.line = document.createElement('div');
    this.line.classList.add('key-board__line');
  }

  getLine() {
    return this.line;
  }

  addKey(keyCode, KEY, state, event1, event2) {
    const myKey = new CreateKey(keyCode, KEY, state);
    const key = myKey.getKey();
    key.addEventListener('mousedown', event1);
    key.addEventListener('mouseup', event2);

    this.line.appendChild(key);
  }
}
