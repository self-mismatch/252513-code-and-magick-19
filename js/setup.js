'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [];

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

// Возвращает объект со случайно сгенерированными данными волшебника
function getRandomWizardSettings() {
  var wizard = {};
  wizard.name = firstNames[getRandomNumber(0, firstNames.length - 1)] + ' ' + secondNames[getRandomNumber(0, secondNames.length - 1)];
  wizard.coatColor = coatColors[getRandomNumber(0, coatColors.length - 1)];
  wizard.eyesColor = eyesColors[getRandomNumber(0, eyesColors.length - 1)];

  return wizard;
}

// Заполняет массив wizards волшебниками со случайно сгенеированными параметрами
function fillWizardsArray(amount) {
  for (var i = 0; i < amount; i++) {
    wizards.push(getRandomWizardSettings());
  }
}

fillWizardsArray(4);

// Возвращает готового стилизованного волшебника
function styleWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();

// Заполняет массив волшебникоми и вставляет их во фрагмент
function createWizardElement() {
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(styleWizard(wizards[i]));
  }
}

createWizardElement();

similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var hasUserNameFocus = false;

// Показывает окно найстроек персонажа
function openSetup() {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', popupEscPressHandler);

  setupClose.addEventListener('click', closeSetup);
  setupClose.addEventListener('keydown', closeButtonEnterPressHandler);

  setupOpen.removeEventListener('click', openSetup);
  setupOpen.removeEventListener('keydown', iconEnterPressHandler);

  setupUserName.addEventListener('focus', toggleUserNameFocusState);
  setupUserName.addEventListener('blur', toggleUserNameFocusState);
}

// Скрывает окно настроек персонажа
function closeSetup() {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', popupEscPressHandler);

  setupClose.removeEventListener('click', closeSetup);
  setupClose.removeEventListener('keydown', closeButtonEnterPressHandler);

  setupOpen.addEventListener('click', openSetup);
  setupOpen.addEventListener('keydown', iconEnterPressHandler);

  setupUserName.removeEventListener('focus', toggleUserNameFocusState);
  setupUserName.removeEventListener('blur', toggleUserNameFocusState);
}

// Меняет логическое значение переменной на противоположное при фокусе/снятии фокуса с поля ввода никнейма
function toggleUserNameFocusState() {
  hasUserNameFocus = !hasUserNameFocus;
}

// Обработчик нажатия "escape"
function popupEscPressHandler(evt) {
  if (evt.key === ESC_KEY && !hasUserNameFocus) {
    closeSetup();
  }
}

// Обработчик нажатия "enter" на изображении игрока
function iconEnterPressHandler(evt) {
  if (evt.key === ENTER_KEY) {
    openSetup();
  }
}

// Обработчик нажатия "escape" на кнопке закрытия окна настроек персонажа
function closeButtonEnterPressHandler(evt) {
  if (evt.key === ENTER_KEY) {
    closeSetup();
  }
}

setupOpen.addEventListener('click', openSetup);
setupOpen.addEventListener('keydown', iconEnterPressHandler);

var setupWizard = setup.querySelector('.setup-wizard');

var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatColor = setup.querySelector('input[name="coat-color"]');

var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesColor = setup.querySelector('input[name="eyes-color"]');

var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballColor = setup.querySelector('input[name="fireball-color"]');

// Меняет цвет плаща волшебника на случайный
function changeCoatColor() {
  var randomColor = coatColors[getRandomNumber(0, coatColors.length - 1)];

  wizardCoat.style.fill = randomColor;
  wizardCoatColor.value = randomColor;
}

// Меняет цвет глаз волшебника на случайный
function changeEyesColor() {
  var randomColor = eyesColors[getRandomNumber(0, eyesColors.length - 1)];

  wizardEyes.style.fill = randomColor;
  wizardEyesColor.value = randomColor;
}

// Меняет цвет фаербола волшебника на случайный
function changeFireballColor() {
  var randomColor = fireballColors[getRandomNumber(0, fireballColors.length - 1)];

  wizardFireball.style.background = randomColor;
  wizardFireballColor.value = randomColor;
}

wizardCoat.addEventListener('click', changeCoatColor);
wizardEyes.addEventListener('click', changeEyesColor);
wizardFireball.addEventListener('click', changeFireballColor);
