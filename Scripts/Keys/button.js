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
    // console.log(`specSymbol: ${classArr}`);
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
    // console.log(lang);
    lang = bodyKeyboard.querySelectorAll(`.${lang}`);
    lang.forEach((elem) => {
      elem.querySelector('.caseDown').classList.add('hidden');
      elem.querySelector('.caseUp').classList.remove('hidden');
    });
  } else if ((item.classList.contains('shiftleft') || item.classList.contains('shiftright')) && !item.classList.contains('active')) {
    // console.log(item.classList);
    for (let i = 0; i < item.children.length; i += 1) {
      if (!item.children[i].classList.contains('hidden')) {
        lang = item.children[i].className;
      }
    }
    // console.log(`second lang: ${lang}`);
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
    // console.log("index: "+ index);
    textArea.setRangeText('\u0009', textArea.selectionStart, textArea.selectionEnd, 'end');
    return;
  }
  if (item.classList.contains('backspace')) {
    // console.log('backspace: ');
    if (textArea.selectionStart === 0) return;
    textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
    return;
  }
  if (item.classList.contains('delete')) {
    // console.log('delete: ');
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
    return;
  }
  if (item.classList.contains('enter')) {
    // console.log('enter: ');
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
    return;
  }
  if (item.classList.contains('space')) {
    // console.log('enter: ');
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
    return;
  }
  if (item.classList.contains('shiftleft') || item.classList.contains('shiftright')) {
    // console.log('shift?: ');
    // textArea.setRangeText("shift?",textArea.selectionStart,textArea.selectionEnd+1,"end");
    useShift(item);
    return;
  }

  textArea.setRangeText(item.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
}
// function buttonActive(){
//     document.addEventListener("keydown",(event)=>{
//         console.log(event.code);
//     });

// }
export function activateKeyboardKeyListeners() {
// on press by keyboard
  document.addEventListener('keydown', (event) => {
  // console.log("keyDown: " + event.code);
    textArea.focus();
    const keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    // console.log( ...keyDown.classList)
    keyDown.classList.add('active');
    insertSymbol(keyDown);
  });

  document.addEventListener('keyup', (event) => {
  //    console.log("keyUp: " + event.code);
    const keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    // console.log( ...keyDown.classList)
    keyDown.classList.remove('active');
    //   console.log(keyDown.classList);
    useShift(keyDown);
  });
}
// on click by mouse

export function activateMouseKeyListeners() {
  document.addEventListener('mousedown', (event) => {
    // console.log('222');
    // console.log("keyDown: " + event.code);
    // console.dir(textArea);
    textArea.focus();
    const button = event.target.closest('button');

    // let keyBody = document.getElementsByClassName('keyboard-wrapper');
    // console.dir(keyBody);
    if (!button) return;

    // console.log(bodyKeyboard);
    if (!bodyKeyboard.contains(button)) return;

    button.classList.add('active');
    // addActiveClass(event.code.toLowerCase());
    insertSymbol(button);
  });

  document.addEventListener('mouseup', (event) => {
  // console.log("keyUp: " + event.code);
    const button = event.target.closest('button');
    if (!button) return;
    // if (!keyBody.contains(button)) return;

    button.classList.remove('active');
    //   console.log(button.classList);
    useShift(button);
  });
}
// textarea.textContent
// function addActiveClass(selector){
//     let keyDown = document.querySelector(`.${selector}`);
//     // console.log( ...keyDown.classList)
//     keyDown.classList.add("active");
// }

// function removeActiveClass(selector){
//     let keyDown = document.querySelector(`.${selector}`);
//     // console.log( ...keyDown.classList)
//     keyDown.classList.remove("active");
// }

// export {buttonActive}
