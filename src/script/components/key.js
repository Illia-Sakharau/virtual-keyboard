export default class Key {
  constructor(keyCode, char) {
    this.keyCode = keyCode;
    this.key = document.createElement('div');
    this.key.setAttribute('data-code', keyCode);
    this.key.classList.add('key-board__key', 'key');
    this.setChar(char);
  }

  getKey() {
    return this.key;
  }

  setChar(char) {
    this.key.textContent = char;
  }
}
