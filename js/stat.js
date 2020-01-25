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

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getRandomSaturationColor(hue, lightness) {
  var saturation = Math.round(Math.random() * 100);
  var color = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';

  return color;
}

window.renderStatistics = function (ctx, players, times) {

  if (players.length > 0 && times.length > 0) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура! Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);

    var maxTime = Math.round(Math.max.apply(null, times));
    var horizontalGap = (CLOUD_WIDTH - BAR_GAP * (players.length - 1) - BAR_WIDTH * players.length) / 2;

    if (players.length !== times.length) {

      if (players.length > times.length) {
        players.splice(times.length - 1, players.length - times.length);
      } else {
        times.splice(players.length - 1, times.length - players.length);
      }
    }

    for (var i = 0; i < players.length; i++) {
      ctx.fillStyle = '#000';
      ctx.textBaseline = 'bottom';
      ctx.fillText(Math.round(times[i]), CLOUD_X + horizontalGap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT - times[i] * (HISTOGRAM_HEIGHT - TEXT_HEIGHT) / maxTime);

      var barColor = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomSaturationColor(240, 50);
      var barHeight = times[i] * (HISTOGRAM_HEIGHT - TEXT_HEIGHT) / maxTime;

      ctx.fillStyle = barColor;
      ctx.fillRect(CLOUD_X + horizontalGap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT * 0.7 - barHeight, BAR_WIDTH, barHeight);

      ctx.fillStyle = '#000';
      ctx.textBaseline = 'bottom';
      ctx.fillText(players[i], CLOUD_X + horizontalGap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT + CLOUD_Y - GAP);
    }
  } else {
    this.alert('Ещё никто не смог победить Газебо, или результаты не сохранились :(');
  }
};
