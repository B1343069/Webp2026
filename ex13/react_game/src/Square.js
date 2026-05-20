import React from 'react';

class Square extends React.Component {
  render() {
    return React.createElement(
      'button',
      {
        className: 'square',
        onClick: this.props.onClick,
      },
      this.props.value
    );
  }
}

export default Square;
