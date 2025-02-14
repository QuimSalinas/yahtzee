import React, { Component } from 'react';
import Die from './Die';
import './Dice.css';

class Dice extends Component {
  handleClick = (idx) => {
      this.props.handleClick(idx);
  }
  render() {
    return(
      <div className="Dice">
        {this.props.dice.map((d, idx) =>
          <Die handleClick={this.handleClick}
            rolling={this.props.rolling}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx} />
        )}
    </div>
    )}
}

export default Dice;