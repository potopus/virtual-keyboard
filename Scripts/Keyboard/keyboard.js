function createButton(setting) {
  const langsMass = setting.langs;
  const button = document.createElement('button');
  for (let i = 0; i < langsMass.length; i += 1) {
    const country = document.createElement('span');
    const caseDown = document.createElement('span');
    const caseUp = document.createElement('span');
    const caps = document.createElement('span');
    const shiftCaps = document.createElement('span');

    if (langsMass[i].country === 'eng') {
      country.classList.add(`${langsMass[i].country}`);
      caseDown.classList.add('caseDown');
    } else {
      country.classList.add(`${langsMass[i].country}`, 'hidden');
      caseDown.classList.add('caseDown', 'hidden');
    }
    caseUp.classList.add('caseUp', 'hidden');
    caps.classList.add('caps', 'hidden');
    shiftCaps.classList.add('shiftCaps', 'hidden');

    caseDown.innerText = `${langsMass[i].caseDown}`;
    caseUp.innerText = `${langsMass[i].caseUp}`;
    caps.innerText = `${langsMass[i].caps}`;
    shiftCaps.innerText = `${langsMass[i].shiftCaps}`;

    country.appendChild(caseDown);
    country.appendChild(caseUp);
    country.appendChild(caps);
    country.appendChild(shiftCaps);
    button.appendChild(country);
  }

  button.classList.add('keyboard__key', 'key', `${setting.name.toLowerCase()}`);
  return button;
}

export default function createKeyboard(keyList) {
  const conteiner = document.createElement('div');// conteiner
  const title = document.createElement('p');// название проекта RSS Виртуальная клавиатура
  const bodyKeyboard = document.createElement('div');// body__keyboard
  const textArea = document.createElement('textarea');
  const textOS = document.createElement('p');
  const textChangeLang = document.createElement('p');

  // add classes
  conteiner.classList.add('conteiner');
  title.classList.add('title');
  textArea.classList.add('text-area');
  bodyKeyboard.classList.add('keyboard-wrapper', 'keyboard');
  textOS.classList.add('keyboard-text', 'text');
  textChangeLang.classList.add('keyboard-text', 'text');

  // set attributes and text
  textArea.setAttribute('row', 5);
  textArea.setAttribute('cols', 50);
  title.innerText = 'RSS Виртуальная клавиатура';
  textOS.innerText = 'Клавиатура выполнена в ОС Windows 7. Home edition. Service pack 1.';
  textChangeLang.innerText = 'Комбинация клавиш для изменения языка ввода: левые Ctrl + Alt';
  for (let i = 0; i < keyList.length; i += 1) {
    const row = document.createElement('div');
    row.classList.add('keyaboard__row', 'row', `row_${i + 1}`);
    for (let j = 0; j < keyList[i].length; j += 1) {
      const newButton = createButton(keyList[i][j]);
      row.appendChild(newButton);
    }
    bodyKeyboard.appendChild(row);
  }
  // add to conteiner
  conteiner.appendChild(title);
  conteiner.appendChild(textArea);
  conteiner.appendChild(bodyKeyboard);
  conteiner.appendChild(textOS);
  conteiner.appendChild(textChangeLang);

  return conteiner;
}

