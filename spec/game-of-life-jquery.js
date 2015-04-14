describe('Game of Life Widget', function () {
  'use strict';
  var gameOfLife, widget;
  beforeEach(function () {
    gameOfLife = SAMURAIPRINCIPLE.observable(jasmine.createSpyObj('gameOfLife', ['tick', 'toggleCellState']));
    widget = jQuery('#gameOfLifeWidget').clone().appendTo('body').gameOfLifeWidget(gameOfLife, 10, 10);
  });
  it('should call toggleCellState method when a table cell is clicked', function () {
    widget.find('.grid div:nth-child(35)').click();

    expect(gameOfLife.toggleCellState).toHaveBeenCalledWith(3, 4, jasmine.any(Object));
  });
  it('should call tick method when tick button is clicked', function () {
    widget.find('.tick').click();

    expect(gameOfLife.tick).toHaveBeenCalled();
  });
  it('should add class alive when cell becomes alive', function () {
    gameOfLife.trigger('cellStateChanged', 3, 4);

    expect(widget.find('.grid div:nth-child(35)').hasClass('alive')).toBe(true);
  });
  it('should remove class alive when cell dies', function () {
    gameOfLife.trigger('cellStateChanged', 3, 4);

    gameOfLife.trigger('cellStateChanged', 3, 4);

    expect(widget.find('.grid div:nth-child(35)').hasClass('alive')).toBe(false);
  });
  it('should animate cell state changes if animation duration parameter is passed', function (done) {
    gameOfLife = SAMURAIPRINCIPLE.observable(jasmine.createSpyObj('gameOfLife', ['tick', 'toggleCellState']));
    widget = jQuery('#gameOfLifeWidget').clone().appendTo('body').gameOfLifeWidget(gameOfLife, 10, 10, 250);

    gameOfLife.trigger('cellStateChanged', 3, 4);

    expect(widget.find('.grid div:nth-child(35)').hasClass('alive')).toBe(false);
    setTimeout(function () {
      expect(widget.find('.grid div:nth-child(35)').hasClass('alive')).toBe(true);
      done();
    }, 300);
  });
});
describe('Game of Life Widget - (sinon.js)', function () {
  var clock;
  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    clock.restore();
  });
  it('should animate cell state changes if animation duration parameter is passed', function () {
    var gameOfLife, widget;
    gameOfLife = SAMURAIPRINCIPLE.observable(jasmine.createSpyObj('gameOfLife', ['tick', 'toggleCellState']));
    widget = jQuery('#gameOfLifeWidget').clone().appendTo('body').gameOfLifeWidget(gameOfLife, 10, 10, 250);

    gameOfLife.trigger('cellStateChanged', 3, 4);

    clock.tick(200);
    expect(widget.find('.grid div:nth-child(35)').hasClass('alive')).toBe(false);
    clock.tick(260);
    expect(widget.find('.grid div:nth-child(35)').hasClass('alive')).toBe(true);
  });
});
