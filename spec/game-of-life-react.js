describe('Game of Life React Component', function () {
  var game, realGameOfLife, testGameOfLife, TestUtils = React.addons.TestUtils;
  beforeEach(function () {
    realGameOfLife = SAMURAIPRINCIPLE.GameOfLife;
    testGameOfLife = SAMURAIPRINCIPLE.observable(jasmine.createSpyObj('gameOfLife', ['tick', 'toggleCellState', 'isCellAlive']));
    SAMURAIPRINCIPLE.GameOfLife = function () {
      return testGameOfLife;
    };
    game = TestUtils.renderIntoDocument(<GameOfLife rows="10" columns="10" />);
  });
  afterEach(function () {
    SAMURAIPRINCIPLE.GameOfLife = realGameOfLife;
  });
  it('should initially render all cells as dead', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(game, 'cell').length).toBe(100);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(game, 'alive').length).toBe(0);
  });
  it('should invoke tick method when tick button is clicked', function () {
    var tickButton = TestUtils.findRenderedDOMComponentWithTag(game, 'button');

    TestUtils.Simulate.click(tickButton);

    expect(testGameOfLife.tick).toHaveBeenCalled();
  });
  it('should invoke toggleCellState method when a cell is clicked', function () {
    var cell_3_4 = TestUtils.scryRenderedDOMComponentsWithClass(game, 'cell')[34];

    TestUtils.Simulate.click(cell_3_4);

    expect(testGameOfLife.toggleCellState).toHaveBeenCalledWith(3, 4, jasmine.any(Object), jasmine.any(String));
  });
  it('should render one cell as alive', function () {
    var cellElement;
    testGameOfLife.isCellAlive = function (row, column) {
      return row === 3 && column === 4;
    };
    testGameOfLife.trigger('boardStateChanged');

    cellElement = TestUtils.scryRenderedDOMComponentsWithClass(game, 'alive');
    expect(cellElement.length).toBe(1);
    //assert position
  });
});