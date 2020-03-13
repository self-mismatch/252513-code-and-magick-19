'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Возвращает готового стилизованного волшебника
  function styleWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  var fragment = document.createDocumentFragment();

  // Заполняет массив волшебникоми и вставляет их во фрагмент
  function createWizards(wizards) {
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(styleWizard(wizards[i]));
    }

    similarList.appendChild(fragment);

    setupSimilar.classList.remove('hidden');
  }

  function renderErrorMessage(errorText) {
    var errorBlock = document.createElement('div');

    errorBlock.style = 'position: absolute; z-index: 100; top: 0; right: 0; left: 0; margin: 0; padding: 5px; font-size: 14px; text-align: center; color: white; background-color: red;';
    errorBlock.textContent = errorText;

    document.body.insertAdjacentElement('afterbegin', errorBlock);
  }

  function onWizardLoadSuccess(wizards) {
    createWizards(wizards);
  }

  function onWizardLoadError(errorText) {
    renderErrorMessage(errorText);
  }

  window.backend.load(onWizardLoadSuccess, onWizardLoadError);

  var setupForm = setup.querySelector('.setup-wizard-form');

  function onWizardSaveSuccess(response) {
    setup.classList.add('hidden');
    console.log(response);
  }

  function onWizardSaveError(errorText) {
    renderErrorMessage(errorText)
  }

  function onSetupFormSubmit(evt) {
    evt.preventDefault();

    window.backend.save(new FormData(setupForm), onWizardSaveSuccess, onWizardSaveError);
  }

  setupForm.addEventListener('submit', onSetupFormSubmit);
})();
