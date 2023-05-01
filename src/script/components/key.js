/**  * Создание клавиши
 * @param {string} keyCode
 * @param {array} KEY
 * @param {number} state
 */

export default class Key {
  constructor(keyCode, KEY, state) {
    this.keyCode = keyCode;
    this.key = document.createElement('div');
    this.key.setAttribute('data-code', keyCode);
    this.key.classList.add('key-board__key', 'key');

    this.keyText = KEY[4] || KEY[state];

    if (KEY[5]) {
      this.key.classList.add('key_size');
    }

    if (KEY[6]) {
      this.key.classList.add('key_color');
    }

    this.setChar(this.keyText);
  }

  getKey() {
    return this.key;
  }

  setChar(keyText) {
    this.key.textContent = keyText;
  }
}
