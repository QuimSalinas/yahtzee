import React, { Component } from "react";
import "./Die.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'

class Die extends Component {
  handleClick = ()=>{
    this.props.handleClick(this.props.idx)
  }
  render() {
    let dice = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];
    let dieClass="Die ";
    if(this.props.locked) dieClass += "Die-locked";
    else if(this.props.rolling) dieClass += "Die-rolling"
    return (
        <FontAwesomeIcon 
          className={dieClass} 
          onClick={this.handleClick} 
          icon={dice[this.props.val-1]}
          size="4x" />
    );
  }
}

export default Die;
