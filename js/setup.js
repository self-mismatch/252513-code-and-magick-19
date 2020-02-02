'use strict';

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var userSettings = document.querySelector('.setup');
userSettings.classList.remove('hidden');

var similarListElement = userSettings.querySelector('.setup-similar-list');

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

// Заполняет массив wizards волшебниками со случайно сггенеированными параметрами
function fillWizardsArray() {
  wizards.push(getRandomWizardSettings());
}

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
function createWizardElement(amount) {
  for (var i = 0; i < amount; i++) {
    fillWizardsArray();
    fragment.appendChild(styleWizard(wizards[i]));
  }
}

createWizardElement(4);

similarListElement.appendChild(fragment);
userSettings.querySelector('.setup-similar').classList.remove('hidden');
