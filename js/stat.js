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
function renderResultText(ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура! Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);
}

// Приводит количество элементов большего массива к количеству элементов меньшего массива, удаляя лишние элементы
function doEquivalentLengthOfArrays(firstArray, secondArray) {
  if (firstArray.length > secondArray.length) {
    firstArray.splice(secondArray.length - 1, firstArray.length - secondArray.length);
  } else {
    secondArray.splice(firstArray.length - 1, secondArray.length - firstArray.length);
  }
}

// Возвращает горизонтальные отступы для выравнивания по центру элементов на канвасе
function getHorizontalGap(array) {
  var horizontalGap = (CLOUD_WIDTH - BAR_GAP * (array.length - 1) - BAR_WIDTH * array.length) / 2;

  return horizontalGap;
}

// Рисует имена игроков на канвасе под колонками
function renderPlayersNames(ctx, names, gap) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'bottom';

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + gap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT + CLOUD_Y - GAP);
  }
}

// Рисует результаты игроков на канвасе над колонками
function renderPlayersResults(ctx, results, maxTime, gap) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'bottom';

  for (var i = 0; i < results.length; i++) {
    ctx.fillText(Math.round(results[i]), CLOUD_X + gap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT - results[i] * (HISTOGRAM_HEIGHT - TEXT_HEIGHT) / maxTime);
  }
}

// Рисует колонки на канвасе с высотой, пропорциональной результу игрока
function renderBars(ctx, names, results, maxTime, gap) {
  for (var i = 0; i < names.length; i++) {
    var barColor = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomSaturationColor(240, 50);
    var barHeight = results[i] * (HISTOGRAM_HEIGHT - TEXT_HEIGHT) / maxTime;

    ctx.fillStyle = barColor;
    ctx.fillRect(CLOUD_X + gap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT * 0.7 - barHeight, BAR_WIDTH, barHeight);
  }
}

window.renderStatistics = function (ctx, players, times) {

  if (players.length > 0 && times.length > 0) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    if (players.length !== times.length) {
      doEquivalentLengthOfArrays(players, times);
    }

    var maxTime = getMaxElementOfArray(times);
    var horizontalGap = getHorizontalGap(players);

    renderResultText(ctx);
    renderPlayersResults(ctx, times, maxTime, horizontalGap);
    renderBars(ctx, players, times, maxTime, horizontalGap);
    renderPlayersNames(ctx, players, horizontalGap);

  } else {
    this.alert('Ещё никто не смог победить Газебо, или результаты не сохранились :(');
  }
};
