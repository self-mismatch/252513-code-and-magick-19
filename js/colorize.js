'use strict';

(function () {
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');

  var wizardCoatColor = setup.querySelector('input[name="coat-color"]');
  var wizardEyesColor = setup.querySelector('input[name="eyes-color"]');
  var wizardFireballColor = setup.querySelector('input[name="fireball-color"]');

  function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  window.colorize = function (element) {
    var randomColor;

    if (element.classList.contains('wizard-coat')) {
      randomColor = coatColors[getRandomNumber(0, coatColors.length - 1)];

      element.style.fill = randomColor;
      wizardCoatColor.value = randomColor;
    } else if (element.classList.contains('wizard-eyes')) {
      randomColor = eyesColors[getRandomNumber(0, eyesColors.length - 1)];

      element.style.fill = randomColor;
      wizardEyesColor.value = randomColor;
    } else if (element.classList.contains('setup-fireball-wrap')) {
      randomColor = fireballColors[getRandomNumber(0, fireballColors.length - 1)];

      element.style.background = randomColor;
      wizardFireballColor.value = randomColor;
    }
  };
})();
