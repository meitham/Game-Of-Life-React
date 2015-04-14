describe('Game of Life React Component', function () {
  var component, realGameOfLife, testGameOfLife, TestUtils = React.addons.TestUtils;
  beforeEach(function () {
    realGameOfLife = SAMURAIPRINCIPLE.GameOfLife;
    testGameOfLife = SAMURAIPRINCIPLE.observable(jasmine.createSpyObj('gameOfLife', ['tick', 'toggleCellState', 'isCellAlive']));
    SAMURAIPRINCIPLE.GameOfLife = function () {
      return testGameOfLife;
    };
    component = TestUtils.renderIntoDocument(<GameOfLifeComponent rows="10" columns="10" />);
  });
  afterEach(function () {
    SAMURAIPRINCIPLE.GameOfLife = realGameOfLife;
  });
  it('should initially render all cells as dead', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell').length).toBe(100);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'alive').length).toBe(0);
  });
  it('should invoke tick method when tick button is clicked', function () {
    var tickButton = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

    TestUtils.Simulate.click(tickButton);

    expect(testGameOfLife.tick).toHaveBeenCalled();
  });
  it('should invoke toggleCellState method when a cell is clicked', function () {
    var cell_3_4 = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell')[34];

    TestUtils.Simulate.click(cell_3_4);

    expect(testGameOfLife.toggleCellState).toHaveBeenCalledWith(3, 4, jasmine.any(Object), jasmine.any(String));
  });
  it('should render one cell as alive', function () {
    var cellElement;
    testGameOfLife.isCellAlive = function (row, column) {
      return row === 3 && column === 4;
    };
    testGameOfLife.trigger('boardStateChanged');

    cellElement = TestUtils.scryRenderedDOMComponentsWithClass(component, 'alive');
    expect(cellElement.length).toBe(1);
    //assert position
  });
});