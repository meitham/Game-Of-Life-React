jQuery.fn.gameOfLifeWidget = function (gameOfLife, rows, columns, animationDuration) {
  'use strict';
  return this.each(function () {
    var self = jQuery(this);
    self.find('.tick').click(gameOfLife.tick);
    Array.apply(null, {length: rows * columns})
      .forEach(function (element, index) {
        var row = Math.floor(index / columns), column = index % columns;
        jQuery('<div></div>')
          .appendTo(self.find('.grid'))
          .addClass('cell')
          .css({ top: 20 * row, left: 20 * column})
          .click(gameOfLife.toggleCellState.bind(gameOfLife, row, column));
      });
    gameOfLife.on('cellStateChanged', function (row, column) {
      self.find('.grid div:nth-child(' + (row * columns + column + 1) + ')').toggleClass('alive', animationDuration);
    });
  });
};
