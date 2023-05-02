import * as keyButtons from './Keys/button.js';
import keyList from './Keys/keyList.js';
import createKeyboard from './Keyboard/keyboard.js';

document.body.append(createKeyboard(keyList));
// buttonKey.buttonActive();
keyButtons.activateKeyboardKeyListeners();
keyButtons.activateMouseKeyListeners();

window.addEventListener('keydown', (event) => {
  event.preventDefault();
});
