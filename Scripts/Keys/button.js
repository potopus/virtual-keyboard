let bodyKeyboard;
let textArea;

window.addEventListener("load", () => {
    bodyKeyboard = document.querySelector(".keyboard-wrapper");
    textArea = document.querySelector(".text-area");
})

// function buttonActive(){
//     document.addEventListener("keydown",(event)=>{
//         console.log(event.code);
//     });

// }

// on press by keyboard
document.addEventListener("keydown", (event) => {
    console.log("keyDown: " + event.code);
    let keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    // console.log( ...keyDown.classList)
    keyDown.classList.add("active");
    textArea.textContent += keyDown.textContent;
});

document.addEventListener("keyup", (event) => {
    console.log("keyUp: " + event.code);
    let keyDown = document.querySelector(`.${event.code.toLowerCase()}`);
    // console.log( ...keyDown.classList)
    keyDown.classList.remove("active");
});


// on click by mouse

document.addEventListener("mousedown", (event) => {
    console.log("keyDown: " + event.code);
    let button = event.target.closest('button');

    // let keyBody = document.getElementsByClassName('keyboard-wrapper');
    // console.dir(keyBody);
    if (!button) return;

    // console.log(bodyKeyboard);
    if (!bodyKeyboard.contains(button)) return;

    button.classList.add("active");
    // addActiveClass(event.code.toLowerCase());
    textArea.textContent += button.textContent;
});

document.addEventListener("mouseup", (event) => {
    console.log("keyUp: " + event.code);
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

// export {buttonActive}