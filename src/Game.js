import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dice: Array.from({ length: NUM_DICE }).fill(Math.ceil(Math.random() * 6)),
        locked: Array(NUM_DICE).fill(false),
        rollsLeft: NUM_ROLLS,
        rolling: false,
        scores: {
          ones: undefined,
          twos: undefined,
          threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      points: 0,
      doneScores: 0,
      gameOver: false,
      newRecord: false,
      maxScore: 0
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.rollAnimation = this.rollAnimation.bind(this);
  }

  componentDidMount(){
    let MaxScore = localStorage.getItem('MaxScore');
    if(MaxScore) this.setState({maxScore: MaxScore});
    this.rollAnimation();
  }

  rollAnimation(){
    if(this.state.rolling===false){
      this.setState({
        rolling: true,
      })
      setTimeout(() => this.roll(),900);
    }
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6),
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
      if(this.state.rollsLeft>0&&!this.state.rolling){
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    if(this.state.scores[rulename]===undefined&&this.state.rollsLeft!==NUM_ROLLS){
      this.setState(st => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
        points: st.points + ruleFn(this.state.dice),
        doneScores: st.doneScores+1
      }),() => this.state.doneScores >=13  ? this.gameOver() : this.rollAnimation());   
    }
  }

  displayRollInfo(idx){
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Roll",
    ]
    return messages[idx];
  }

  gameOver = () => {
    this.setState({
      gameOver: true,
      newRecord: this.state.points>this.state.maxScore,
      maxScore: Math.max(this.state.maxScore, this.state.points)
    },() => localStorage.setItem('MaxScore', this.state.maxScore));
  }

  reset = () => {
    this.setState(st =>{
      let newState = {
        dice: Array.from({ length: NUM_DICE }).fill(Math.ceil(Math.random() * 6)),
        locked: Array(NUM_DICE).fill(false),
        rollsLeft: NUM_ROLLS,
        rolling: false,
        scores: {
          ones: undefined,
          twos: undefined,
          threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      points: 0,
      doneScores: 0,
      gameOver: false,
      newRecord: false      
      }
      return newState;  
    }, () => this.rollAnimation())
  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h2 className="App-record">Record <b>{this.state.maxScore}</b> points</h2>
          <h1 className='App-title'>Yahtzee!</h1>
          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              rolling={this.state.rolling}
            />
            <div className='Game-button-wrapper'>
              {this.state.gameOver
              ? <button
                className='Game-reroll Game-replay'
                onClick={this.reset}
              >
                Play Again?
              </button>
              : <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x)||this.state.rolling}
                onClick={this.rollAnimation}
              >
                {this.displayRollInfo(this.state.rollsLeft)}
              </button>
              }
            </div>
          </section>
        </header>
        {this.state.newRecord
        ?<h2 className="App-points App-NewRecord">NEW RECORD: {this.state.points + " Points"}</h2>
        :<h2 className="App-points">{this.state.points + " Points"}</h2>
        }
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
