import { keyList } from "../Keys/keyList.js";

function createKeyboard(keyList) {
    let conteiner = document.createElement('div');// conteiner
    let title = document.createElement("p");// название проекта RSS Виртуальная клавиатура
    let bodyKeyboard = document.createElement('div');//body__keyboard
    let textArea = document.createElement("textarea");
    let textOS = document.createElement("p");
    let textChangeLang = document.createElement("p");

    // add classes
    conteiner.classList.add("conteiner");
    title.classList.add("title");
    textArea.classList.add("text-area");
    bodyKeyboard.classList.add('keyboard-wrapper','keyboard');
    textOS.classList.add('keyboard-text','text');
    textChangeLang.classList.add('keyboard-text','text');

    // set attributes and text
    textArea.setAttribute("row", 5);
    textArea.setAttribute("cols", 50);
    title.innerText = "RSS Виртуальная клавиатура";
    textOS.innerText = "Клавиатура выполнена в ОС Windows 7. Home edition. Service pack 1.";
    textChangeLang.innerText = "Комбинация клавиш для изменения языка ввода: левые Ctrl + Alt";
    for (let i = 0; i < keyList.length; i++) {
        let row = document.createElement("div");
        row.classList.add('keyaboard__row','row',`row_${i + 1}`);
        for (let j = 0; j < keyList[i].length; j++) {
            row.appendChild(createButton(keyList[i][j]));

        }
        bodyKeyboard.appendChild(row);
    }
    //add to conteiner
    conteiner.appendChild(title);
    conteiner.appendChild(textArea);
    conteiner.appendChild(bodyKeyboard);
    conteiner.appendChild(textOS);
    conteiner.appendChild(textChangeLang);

    return conteiner
};

// console.log(keyList[0][0].langs[0]);
function createButton(setting) {
    let button = document.createElement('button');
    button.classList.add(`keyboard__key`, `key`, `${setting.name.toLowerCase()}`);
    button.innerText = `${setting.langs[0].caseDown}`
    return button
}

export { createKeyboard };