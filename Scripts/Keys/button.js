let bodyKeyboard;
let textArea;
let index;
window.addEventListener("load", () => {
    bodyKeyboard = document.querySelector(".keyboard-wrapper");
    textArea = document.querySelector(".text-area");

    window.onkeydown = function (event) {
        event.preventDefault()
    }
    
})

// function buttonActive(){
//     document.addEventListener("keydown",(event)=>{
//         console.log(event.code);
//     });

// }

// on press by keyboard
document.addEventListener("keydown", (event) => {
    // console.log("keyDown: " + event.code);
    textArea.focus();
    let keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    // console.log( ...keyDown.classList)
    keyDown.classList.add("active");
    insertSymbol(keyDown);
});

document.addEventListener("keyup", (event) => {
    // console.log("keyUp: " + event.code);
    let keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    // console.log( ...keyDown.classList)
    keyDown.classList.remove("active");
   
});


// on click by mouse

document.addEventListener("mousedown", (event) => {
    // console.log("keyDown: " + event.code);
    // console.dir(textArea);
    textArea.focus();
    let button = event.target.closest('button');

    // let keyBody = document.getElementsByClassName('keyboard-wrapper');
    // console.dir(keyBody);
    if (!button) return;

    // console.log(bodyKeyboard);
    if (!bodyKeyboard.contains(button)) return;

    button.classList.add("active");
    // addActiveClass(event.code.toLowerCase());
    insertSymbol(button);
});

document.addEventListener("mouseup", (event) => {
    // console.log("keyUp: " + event.code);
    let button = event.target.closest('button');
    if (!button) return;
    //if (!keyBody.contains(button)) return; 

    button.classList.remove("active");
});

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

function insertSymbol(item) {
    if (isSpecButton(item)) { return };
    if (item.classList.contains("tab")) {
        // console.log("index: "+ index);
        textArea.setRangeText("\u0009",textArea.selectionStart,textArea.selectionEnd,"end")
        return
    }
    if (item.classList.contains("backspace")) {
        console.log("backspace: ");
        if (textArea.selectionStart===0)return;
        textArea.setRangeText("",textArea.selectionStart-1,textArea.selectionEnd,"end");
        return
    }
    if (item.classList.contains("delete")) {
        console.log("delete: ");
        textArea.setRangeText("",textArea.selectionStart,textArea.selectionEnd+1,"end")
        return
    }
    if (item.classList.contains("enter")) {
        console.log("enter: ");
        textArea.setRangeText("\n",textArea.selectionStart,textArea.selectionEnd+1,"end")
        return
    }
    if (item.classList.contains("shiftleft")||item.classList.contains("shiftright")) {
        console.log("shift?: ");
        textArea.setRangeText("shift?",textArea.selectionStart,textArea.selectionEnd+1,"end")
        return
    }
    
    
    textArea.setRangeText(item.innerText,textArea.selectionStart,textArea.selectionEnd,"end");
}


function isSpecButton(btn) {
    let classArr = btn.classList;
    if (
        classArr.contains("controlleft") ||
        classArr.contains("controlright") ||
        classArr.contains("altleft") ||
        classArr.contains("altright") ||
        classArr.contains("capslock")
    ) {
        console.log("specSymbol: " + classArr);
        return true
    }
}


// export {buttonActive}