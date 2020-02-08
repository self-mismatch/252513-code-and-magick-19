'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var TEXT_HEIGHT = 20;

// Рисует облако на канвасе с заданными позицией и цветом
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

// Возвращает цвет в формате hsl со случайной насыщенностью
function getRandomSaturationColor(hue, lightness) {
  var saturation = Math.round(Math.random() * 100);
  var color = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';

  return color;
}

// Возвращает наибольший по значению элемент в массиве
function getMaxElementOfArray(array) {
  var maxElement = Math.round(Math.max.apply(null, array));

  return maxElement;
}

// Рисует текст на канвасе с результатом игры
function renderCongratulationsText(ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';

  ctx.fillText('Ура! Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);
}

// Приводит количество элементов большего массива к количеству элементов меньшего массива, удаляя лишние элементы
function doEquivalentLengthOfArrays(firstArray, secondArray) {
  if (firstArray.length > secondArray.length) {
    firstArray.length = secondArray.length;
  } else {
    secondArray.length = firstArray.length;
  }
}

// Рисует имена игроков на канвасе под колонками
function renderPlayerName(ctx, name, xCoordinate) {
  ctx.fillText(name, xCoordinate, CLOUD_HEIGHT + CLOUD_Y - GAP);
}

// Рисует колонки на канвасе с высотой, пропорциональной результу игрока
function renderBar(ctx, xCoordinate, height, name) {
  var barColor = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomSaturationColor(240, 50);

  ctx.fillStyle = barColor;
  ctx.fillRect(xCoordinate, CLOUD_HEIGHT - TEXT_HEIGHT * 0.7 - height - GAP, BAR_WIDTH, height);
}

// Рисует результаты игроков на канвасе над колонками
function renderPlayerResult(ctx, result, xCoordinate, barHeight) {
  ctx.fillText(result, xCoordinate, CLOUD_HEIGHT - TEXT_HEIGHT - barHeight - GAP);
}

// Рисует результаты икроков на канвасе: числовой результат, колонку, пропорциональную отношению результата игрока к наибольшему результату, и имя игрока
function renderResultBlocks(ctx, amount, players, times, maxTime) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'bottom';

  for (var i = 0; i < amount; i++) {
    var xCoordinate = CLOUD_X + GAP + (BAR_GAP + BAR_WIDTH) * i;
    var barHeight = times[i] * (HISTOGRAM_HEIGHT - TEXT_HEIGHT) / maxTime;
    var playerResult = Math.round(times[i]);

    renderPlayerName(ctx, players[i], xCoordinate);
    renderBar(ctx, xCoordinate, barHeight, players[i]);
    renderPlayerResult(ctx, playerResult, xCoordinate, barHeight);
  }
}

// Выводит финальный блок статистики
window.renderStatistics = function (ctx, names, times) {

  if (names.length > 0 && times.length > 0) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    if (names.length !== times.length) {
      doEquivalentLengthOfArrays(names, times);
    }

    renderCongratulationsText(ctx);

    var maxTime = getMaxElementOfArray(times);

    renderResultBlocks(ctx, names.length, names, times, maxTime);

  } else {
    this.alert('Ещё никто не смог победить Газебо, или результаты не сохранились :(');
  }
};
