let bodyKeyboard;
let textArea;
let pressedKeys = new Set();
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

function useShift(item) {
  // узнать какой элемент с классом lang сейчас active
  let lang = checkLangOnElement(item);

  if (item.innerText !== "Shift") { return };
  // проверить какой класс у кнопки shift без hidden
  let langElem = item.querySelector(`.${lang}`);
  let openRegistrElement;
  let closeRegistrElement;
  for (let i = 0; i < langElem.children.length; i += 1) {
    console.log(langElem.children[i]);
    if (!langElem.children[i].classList.contains('hidden')) {
      console.log("Беру: " + langElem.children[i].className);
      openRegistrElement = langElem.children[i].className;
    }
  }
  console.log(openRegistrElement);
  closeRegistrElement = findCloseElement(openRegistrElement);

  if ((item.classList.contains('shiftleft') || item.classList.contains('shiftright')) && item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, openRegistrElement, closeRegistrElement);
  } else if ((item.classList.contains('shiftleft') || item.classList.contains('shiftright')) &&
    !item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, openRegistrElement, closeRegistrElement);
  }
}

function findCloseElement(openElement) {
  if (openElement === 'caseDown') { return 'caseUp' }
  else if (openElement === 'caseUp') { return 'caseDown' }
  else if (openElement === "caps") { return "shiftCaps" }
  else if (openElement === "shiftCaps") { return "caps" }

}


function useCapsLock(item) {
  let lang = checkLangOnElement(item);
  if (item.classList.contains('capslock') && item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, 'caseDown', 'caps');
  } else if (item.classList.contains('capslock') &&
    !item.classList.contains('active')) {
    changeHiddenOnKeyButton(lang, 'caps', 'caseDown');
  }
}

function useLeftCtrlAlt(item) {
  console.log("вошли в: useLeftCtrlAlt");
  let anotherLang;
  let lang = checkLangOnElement(item);
  if (lang === "eng") { anotherLang = "rus" }
  else { anotherLang = "eng" };
  console.log(lang);
  console.log(item.children);
  let langElem = item.querySelector(`.${lang}`);
  let openRegistrElement;
  // выбираем открытый элемент с классом без hidden
  for (let i = 0; i < langElem.children.length; i += 1) {
    console.log(langElem.children[i]);
    if (!langElem.children[i].classList.contains('hidden')) {
      console.log("Беру: " + langElem.children[i].className);
      openRegistrElement = langElem.children[i].className;
    }
  }
  console.log(openRegistrElement);
  transportToAnotherLang(lang, anotherLang, openRegistrElement);
  // for (let element of item.children) {
  //   if (element.classList.contains(lang)) {
  //     element.classList.add("hidden")
  //   } else (element.classList.remove("hidden"))
  // }
}

function checkLangOnElement(parentItem) {
  let language;
  for (let i = 0; i < parentItem.children.length; i += 1) {
    if (!parentItem.children[i].classList.contains('hidden')) {
      language = parentItem.children[i].className;
    }
  }
  return language
}

function changeHiddenOnKeyButton(lang, hideElem, showElem) {
  // for (let i = 0; i < parentItem.children.length; i += 1) {
  //   if (!parentItem.children[i].classList.contains('hidden')) {
  //     lang = parentItem.children[i].className;
  //   }
  // }

  let langMass = bodyKeyboard.querySelectorAll(`.${lang}`);
  // изменить класс hidden у всех кнопок
  langMass.forEach((elem) => {
    elem.querySelector(`.${hideElem}`).classList.add('hidden');
    elem.querySelector(`.${showElem}`).classList.remove('hidden');
  });
}

function transportToAnotherLang(lang, anotherLang, openRegistrElement) {
  let allButtons = document.querySelectorAll(".keyboard__key");
  allButtons.forEach(button => {
    // добавить hidden открытому элементу
    let openElement = button.querySelector(`.${lang}`);
    openElement.classList.add('hidden');
    let openCurrentRegistr = openElement.querySelector(`.${openRegistrElement}`);
    openCurrentRegistr.classList.add('hidden');
    // убрать hidden закрытому элементу
    let closeElement = button.querySelector(`.${anotherLang}`);
    closeElement.classList.remove('hidden');
    let closeCurrentRegistr = closeElement.querySelector(`.${openRegistrElement}`);
    closeCurrentRegistr.classList.remove('hidden');

  });
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
  if (item.classList.contains('capslock')) {
    useCapsLock(item);
    return;
  }
  if (item.classList.contains('controlleft') || item.classList.contains('altleft')) {
    pressedKeys.add(item.innerText);
    // console.log(`вход елементом: ${keyDown.innerText}`);
    // console.log(pressedKeys);
    if (!(pressedKeys.has('Ctrl') && pressedKeys.has('Alt'))) {
      return;
    }
    // console.log(pressedKeys);
    pressedKeys.clear();
    useLeftCtrlAlt(item);
    console.log("Работает левае");
    return
  }


  textArea.setRangeText(item.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
}

export function activateKeyboardKeyListeners() {
  // on press by keyboard
  document.addEventListener('keydown', (event) => {
    textArea.focus();
    const keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
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
    if (keyUp.classList.contains('controlleft') || keyUp.classList.contains('altleft')) {
      pressedKeys.delete(keyUp.innerText);
      keyUp.classList.remove('active');
      console.log("Вижу удалил");
    }
    else if (!keyUp.classList.contains('capslock')) {
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
