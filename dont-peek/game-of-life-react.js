var GameOfLifeComponent = React.createClass({
  getCurrentState: function () {
    var self = this;
    return {
      cells: Array.apply(null, {length: self.props.rows * self.props.columns}).map(function (element, index) {
        row = Math.floor(index / self.props.columns);
        column = index % self.props.columns;
        return {
          row: row,
          column: column,
          isAlive: self.model.isCellAlive(row, column)
        };
      })
    };
  },
  getInitialState: function () {
    this.model = new SAMURAIPRINCIPLE.GameOfLife();
    return this.getCurrentState();
  },
  componentDidMount: function () {
    var self = this;
    this.model.on('boardStateChanged', function () {
      self.setState(self.getCurrentState());
    });
  },
  render: function() {
    var self = this;
    return <div>
      <div className="grid" style={{width: 20 * this.props.rows, height: 20 * this.props.columns}}>
        {
          this.state.cells.map(function (cell, index) {
            return <div key={index}
              className={'cell' + (cell.isAlive ? ' alive' : '')}
              onClick={self.model.toggleCellState.bind(self, cell.row, cell.column)}
              style={{top: 20 * cell.row, left: 20 * cell.column}}
            />;
          })
        }
      </div>
      <button onClick={this.model.tick}>Tick</button>
    </div>;
  }
});
