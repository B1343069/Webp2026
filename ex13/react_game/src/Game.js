import React from 'react';
import Board from './Board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const isDraw = !winner && current.squares.every(Boolean);

    const moves = history.map((step, move) => {
      const description = move ? `Go to move #${move}` : 'Go to game start';

      return React.createElement(
        'li',
        { key: move },
        React.createElement(
          'button',
          {
            className: move === this.state.stepNumber ? 'move active' : 'move',
            onClick: () => this.jumpTo(move),
          },
          description
        )
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (isDraw) {
      status = 'Draw';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return React.createElement(
      'main',
      { className: 'game-shell' },
      React.createElement(
        'section',
        { className: 'game' },
        React.createElement(
          'div',
          { className: 'game-board' },
          React.createElement(Board, {
            squares: current.squares,
            onClick: (i) => this.handleClick(i),
          })
        ),
        React.createElement(
          'div',
          { className: 'game-info' },
          React.createElement('h1', null, 'React OX Game'),
          React.createElement('div', { className: 'status' }, status),
          React.createElement('ol', null, moves)
        )
      )
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default Game;
