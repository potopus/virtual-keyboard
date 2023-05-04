let bodyKeyboard;
let textArea;
const pressedKeys = new Set();
window.addEventListener('load', () => {
  bodyKeyboard = document.querySelector('.keyboard-wrapper');
  textArea = document.querySelector('.text-area');
});

function isSpecButton(btn) {
  const classArr = btn.classList;
  if (classArr.contains('controlright') || classArr.contains('altright')
  ) {
    return true;
  }
  return false;
}

function checkLangOnElement(parentItem) {
  let language;
  for (let i = 0; i < parentItem.children.length; i += 1) {
    if (!parentItem.children[i].classList.contains('hidden')) {
      language = parentItem.children[i].className;
    }
  }
  return language;
}

function findCloseElement(openElement) {
  if (openElement === 'caseDown') { return 'caseUp'; }
  if (openElement === 'caseUp') { return 'caseDown'; }
  if (openElement === 'caps') { return 'shiftCaps'; }
  if (openElement === 'shiftCaps') { return 'caps'; }
  return undefined;
}

function changeHiddenOnKeyButton(lang, hideElem, showElem) {
  const langMass = bodyKeyboard.querySelectorAll(`.${lang}`);
  // изменить класс hidden у всех кнопок
  langMass.forEach((elem) => {
    elem.querySelector(`.${hideElem}`).classList.add('hidden');
    elem.querySelector(`.${showElem}`).classList.remove('hidden');
  });
}

function useShift(item) {
  // узнать какой элемент с классом lang сейчас active
  const lang = checkLangOnElement(item);

  if (item.innerText !== 'Shift') { return; }
  // проверить какой класс у кнопки shift без hidden
  const langElem = item.querySelector(`.${lang}`);
  let openRegistrElement;
  for (let i = 0; i < langElem.children.length; i += 1) {
    if (!langElem.children[i].classList.contains('hidden')) {
      openRegistrElement = langElem.children[i].className;
    }
  }
  const closeRegistrElement = findCloseElement(openRegistrElement);
  if ((item.classList.contains('shiftleft') || item.classList.contains('shiftright')) && item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, openRegistrElement, closeRegistrElement);
  } else if ((item.classList.contains('shiftleft') || item.classList.contains('shiftright'))
    && !item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, openRegistrElement, closeRegistrElement);
  }
}

function useCapsLock(item) {
  const lang = checkLangOnElement(item);
  if (item.classList.contains('capslock') && item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, 'caseDown', 'caps');
  } else if (item.classList.contains('capslock')
    && !item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, 'caps', 'caseDown');
  }
}

function transportToAnotherLang(lang, anotherLang, openRegistrElement) {
  const allButtons = document.querySelectorAll('.keyboard__key');
  allButtons.forEach((button) => {
    // добавить hidden открытому элементу
    const openElement = button.querySelector(`.${lang}`);
    openElement.classList.add('hidden');
    const openCurrentRegistr = openElement.querySelector(`.${openRegistrElement}`);
    openCurrentRegistr.classList.add('hidden');
    // убрать hidden закрытому элементу
    const closeElement = button.querySelector(`.${anotherLang}`);
    closeElement.classList.remove('hidden');
    const closeCurrentRegistr = closeElement.querySelector(`.${openRegistrElement}`);
    closeCurrentRegistr.classList.remove('hidden');
  });
}

function useLeftCtrlAlt(item) {
  let anotherLang;
  const lang = checkLangOnElement(item);
  if (lang === 'eng') { anotherLang = 'rus'; } else { anotherLang = 'eng'; }
  const langElem = item.querySelector(`.${lang}`);
  let openRegistrElement;
  // выбираем открытый элемент с классом без hidden
  for (let i = 0; i < langElem.children.length; i += 1) {
    if (!langElem.children[i].classList.contains('hidden')) {
      openRegistrElement = langElem.children[i].className;
    }
  }
  transportToAnotherLang(lang, anotherLang, openRegistrElement);
  localStorage.setItem('lang', `${anotherLang}`);
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
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd, 'end');
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
  if (item.classList.contains('capslock')) {
    useCapsLock(item);
    return;
  }
  if (item.classList.contains('controlleft') || item.classList.contains('altleft')) {
    pressedKeys.add(item.innerText);
    if (!(pressedKeys.has('Ctrl') && pressedKeys.has('Alt'))) {
      return;
    }
    pressedKeys.clear();
    useLeftCtrlAlt(item);
    return;
  }

  textArea.setRangeText(item.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
}

export function activateKeyboardKeyListeners() {
  // on press by keyboard
  document.addEventListener('keydown', (event) => {
    textArea.focus();
    const keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    if (!keyDown) { return; }
    if (!keyDown.classList.contains('capslock')) {
      keyDown.classList.add('active');
      insertSymbol(keyDown);
    } else if (keyDown.classList.contains('capslock')) {
      keyDown.classList.toggle('active');
      insertSymbol(keyDown);
    }
  });

  document.addEventListener('keyup', (event) => {
    const keyUp = document.querySelector(`.${event.code.toLowerCase()}`);
    if (!keyUp) { return; }
    if (keyUp.classList.contains('controlleft') || keyUp.classList.contains('altleft')) {
      pressedKeys.delete(keyUp.innerText);
      keyUp.classList.remove('active');
    } else if (!keyUp.classList.contains('capslock')) {
      keyUp.classList.remove('active');
      useShift(keyUp);
    }
  });
}
// on click by mouse

export function activateMouseKeyListeners() {
  document.addEventListener('mousedown', (event) => {
    textArea.focus();
    const button = event.target.closest('button');
    if (!button) return;
    if (!bodyKeyboard.contains(button)) return;
    if (!button.classList.contains('capslock')) {
      button.classList.add('active');
      insertSymbol(button);
    } else {
      button.classList.toggle('active');
      insertSymbol(button);
    }
  });

  document.addEventListener('mouseup', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (!button.classList.contains('capslock')) {
      button.classList.remove('active');
      useShift(button);
    }
  });
}
