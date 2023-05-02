let bodyKeyboard;
let textArea;
window.addEventListener('load', () => {
  bodyKeyboard = document.querySelector('.keyboard-wrapper');
  textArea = document.querySelector('.text-area');
});

function isSpecButton(btn) {
  const classArr = btn.classList;
  if (
    classArr.contains('controlleft')
        || classArr.contains('controlright')
        || classArr.contains('altleft')
        || classArr.contains('altright')
        || classArr.contains('capslock')
  ) {
    return true;
  }
  return false;
}

function useShift(item) {
  let lang;
  if ((item.classList.contains('shiftleft') || item.classList.contains('shiftright')) && item.classList.contains('active')) {
    for (let i = 0; i < item.children.length; i += 1) {
      if (!item.children[i].classList.contains('hidden')) {
        lang = item.children[i].className;
      }
    }
    lang = bodyKeyboard.querySelectorAll(`.${lang}`);
    lang.forEach((elem) => {
      elem.querySelector('.caseDown').classList.add('hidden');
      elem.querySelector('.caseUp').classList.remove('hidden');
    });
  } else if ((item.classList.contains('shiftleft') || item.classList.contains('shiftright')) && !item.classList.contains('active')) {
    for (let i = 0; i < item.children.length; i += 1) {
      if (!item.children[i].classList.contains('hidden')) {
        lang = item.children[i].className;
      }
    }
    lang = bodyKeyboard.querySelectorAll(`.${lang}`);
    lang.forEach((elem) => {
      elem.querySelector('.caseDown').classList.remove('hidden');
      elem.querySelector('.caseUp').classList.add('hidden');
    });
  }
}

function insertSymbol(item) {
  if (isSpecButton(item)) { return; }
  if (item.classList.contains('tab')) {
    textArea.setRangeText('\u0009', textArea.selectionStart, textArea.selectionEnd, 'end');
    return;
  }
  if (item.classList.contains('backspace')) {
    if (textArea.selectionStart === 0) return;
    textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
    return;
  }
  if (item.classList.contains('delete')) {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
    return;
  }
  if (item.classList.contains('enter')) {
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
    return;
  }
  if (item.classList.contains('space')) {
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
    return;
  }
  if (item.classList.contains('shiftleft') || item.classList.contains('shiftright')) {
    useShift(item);
    return;
  }

  textArea.setRangeText(item.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
}

export function activateKeyboardKeyListeners() {
// on press by keyboard
  document.addEventListener('keydown', (event) => {
    textArea.focus();
    const keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    keyDown.classList.add('active');
    insertSymbol(keyDown);
  });

  document.addEventListener('keyup', (event) => {
    const keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    keyDown.classList.remove('active');
    useShift(keyDown);
  });
}
// on click by mouse

export function activateMouseKeyListeners() {
  document.addEventListener('mousedown', (event) => {
    textArea.focus();
    const button = event.target.closest('button');
    if (!button) return;
    if (!bodyKeyboard.contains(button)) return;

    button.classList.add('active');
    insertSymbol(button);
  });

  document.addEventListener('mouseup', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    button.classList.remove('active');
    useShift(button);
  });
}
