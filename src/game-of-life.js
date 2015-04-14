/*global jQuery*/
var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};
SAMURAIPRINCIPLE.GameOfLife = function (rows, columns) {
  'use strict';
  var self = SAMURAIPRINCIPLE.observable(this),
    isAlive = {},
    cellKey = function (row, column) {
      return row + '_' + column;
    },
    toggleCellState = function (row, column) {
      var key = cellKey(row, column);
      if (isAlive[key]) {
        delete isAlive[key];
      } else {
        isAlive[key] = true;
      }
      self.trigger('cellStateChanged', row, column, self.isCellAlive(row, column));
    };
  rows = rows || 0;
  columns = columns || 0;
  self.isCellAlive = function (row, column) {
    return isAlive[cellKey(row, column)] || false;
  };
  self.toggleCellState = function (row, column) {
    toggleCellState(row, column);
    self.trigger('boardStateChanged');
    return self;
  };
  self.tick = function () {
    var key, parts, row, column, numberOfNeighbours = {}, neighbourKey;
    for (key in isAlive) {
      parts = key.split('_');
      row = parseInt(parts[0], 10);
      column = parseInt(parts[1], 10);
      numberOfNeighbours[key] = numberOfNeighbours[key] || 0;
      [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(function (offset) {
        neighbourKey = cellKey(row + offset[0], column + offset[1]);
        numberOfNeighbours[neighbourKey] = (numberOfNeighbours[neighbourKey] || 0) + 1;
      });
    }
    for (key in numberOfNeighbours) {
      if (isAlive[key] && (numberOfNeighbours[key] < 2 || numberOfNeighbours[key] > 3) || !isAlive[key] && numberOfNeighbours[key] === 3) {
        parts = key.split('_');
        row = parseInt(parts[0], 10);
        column = parseInt(parts[1], 10);
        toggleCellState(row, column);
      }
    }
    self.trigger('boardStateChanged');
  };
};
