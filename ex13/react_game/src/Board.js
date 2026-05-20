import React from 'react';
import Square from './Square.js';

class Board extends React.Component {
  renderSquare(i) {
    return React.createElement(Square, {
      value: this.props.squares[i],
      onClick: () => this.props.onClick(i),
    });
  }

  renderRow(start) {
    return React.createElement(
      'div',
      { className: 'board-row' },
      this.renderSquare(start),
      this.renderSquare(start + 1),
      this.renderSquare(start + 2)
    );
  }

  render() {
    return React.createElement(
      'div',
      null,
      this.renderRow(0),
      this.renderRow(3),
      this.renderRow(6)
    );
  }
}

export default Board;
