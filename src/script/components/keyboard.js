/* eslint-disable */
import KEYS from '../data/keys.js';
import Line from './line.js';


export default function createKeyboard(state, clickDownKey, clickUpKey) {
  const keyBoard = document.createElement('section');
  keyBoard.classList.add('key-board');

  let line = new Line;

  if(KEYS) {
    let count = 0;

    for (let key in KEYS) {

      if (count < 14) {
        line.addKey(key, KEYS[key], state, clickDownKey, clickUpKey);
      }

      if (count === 14) {
        keyBoard.appendChild(line.getLine());
        line = new Line;
      }

      if (count >= 14 && count < 29) {
        line.addKey(key, KEYS[key], state, clickDownKey, clickUpKey);
      }  

      if (count === 29) {
        keyBoard.appendChild(line.getLine());
        line = new Line;
      }

      if (count >= 29 && count < 42) {
        line.addKey(key, KEYS[key], state, clickDownKey, clickUpKey);
      }  
      
      if (count === 42) {
        keyBoard.appendChild(line.getLine());
        line = new Line;
      }

      if (count >= 42 && count < 55) {
        line.addKey(key, KEYS[key], state, clickDownKey, clickUpKey);
      }  
      
      if (count === 55) {
        keyBoard.appendChild(line.getLine());
        line = new Line;
      }

      if (count >= 55) {
        line.addKey(key, KEYS[key], state, clickDownKey, clickUpKey);
      }  

      if (count >= 55) {
        keyBoard.appendChild(line.getLine());
      }
      
      
      count++;

    }
  }

  return keyBoard;
}