'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var upload = setup.querySelector('.upload');

  var hasUserNameFocus = false;

  var setupWizard = setup.querySelector('.setup-wizard');

  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  // Обработчик нажатия "escape"
  function popupEscPressHandler(evt) {
    if (!hasUserNameFocus) {
      window.util.isEscEvent(evt, closeSetup);
    }
  }

  // Обработчик нажатия "enter" на изображении игрока
  function iconEnterPressHandler(evt) {
    window.util.isEnterEvent(evt, openSetup);
  }

  // Обработчик нажатия "enter" на кнопке закрытия окна настроек персонажа
  function closeButtonEnterPressHandler(evt) {
    window.util.isEnterEvent(evt, closeSetup);
  }

  // Меняет логическое значение переменной на противоположное при фокусе/снятии фокуса с поля ввода никнейма
  function toggleUserNameFocusState() {
    hasUserNameFocus = !hasUserNameFocus;
  }

  function onCoatClick() {
    window.colorize(wizardCoat);
  }

  function onEyesClick() {
    window.colorize(wizardEyes);
  }

  function onFireballClick() {
    window.colorize(wizardFireball);
  }

  setupOpen.addEventListener('click', openSetup);
  setupOpen.addEventListener('keydown', iconEnterPressHandler);

  // Показывает окно найстроек персонажа
  function openSetup() {
    setup.classList.remove('hidden');

    document.addEventListener('keydown', popupEscPressHandler);

    setupClose.addEventListener('click', closeSetup);
    setupClose.addEventListener('keydown', closeButtonEnterPressHandler);

    setupUserName.addEventListener('focus', toggleUserNameFocusState);
    setupUserName.addEventListener('blur', toggleUserNameFocusState);

    wizardCoat.addEventListener('click', onCoatClick);
    wizardEyes.addEventListener('click', onEyesClick);
    wizardFireball.addEventListener('click', onFireballClick);

    setupOpen.removeEventListener('click', openSetup);
    setupOpen.removeEventListener('keydown', iconEnterPressHandler);
  }

  // Скрывает окно настроек персонажа
  function closeSetup() {
    setup.classList.add('hidden');

    document.removeEventListener('keydown', popupEscPressHandler);

    setupClose.removeEventListener('click', closeSetup);
    setupClose.removeEventListener('keydown', closeButtonEnterPressHandler);

    setupUserName.removeEventListener('focus', toggleUserNameFocusState);
    setupUserName.removeEventListener('blur', toggleUserNameFocusState);

    setupOpen.addEventListener('click', openSetup);
    setupOpen.addEventListener('keydown', iconEnterPressHandler);
  }

  function onMouseDown(downEvt) {
    downEvt.preventDefault();

    var isDragged = false;

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    function onClickPreventDefault(clickEvt) {
      clickEvt.preventDefault();

      setup.removeEventListener('click', onClickPreventDefault);
    }

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.left = setup.offsetLeft - shift.x + 'px';
      setup.style.top = setup.offsetTop - shift.y + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        setup.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  upload.addEventListener('mousedown', onMouseDown);
})();
