import React, { Component } from 'react';
import RuleRow from './RuleRow';
import './ScoreTable.css';
import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, chance } from './Rules';


class ScoreTable extends Component {

  render() {
    const { scores, doScore } = this.props;

    return (
      <div className="ScoreTable">
        <section className="ScoreTable-section">
          <h2 className="ScoreTable-Title">Upper</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow name="Ones" comment={"1 point per 1"} score={scores.ones} doScore={evt => doScore("ones", ones.evalRoll)} />
              <RuleRow name="Twos" comment={"2 points per 2"} score={scores.twos} doScore={evt => doScore("twos", twos.evalRoll)} />
              <RuleRow name="Threes" comment={"3 points per 3"} score={scores.threes} doScore={evt => doScore("threes", threes.evalRoll)} />
              <RuleRow name="Fours" comment={"4 points per 4"} score={scores.fours} doScore={evt => doScore("fours", fours.evalRoll)} />
              <RuleRow name="Fives" comment={"5 points per 5"} score={scores.fives} doScore={evt => doScore("fives", fives.evalRoll)} />
              <RuleRow name="Sixes" comment={"6 points per 6"} score={scores.sixes} doScore={evt => doScore("sixes", sixes.evalRoll)} />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section ScoreTable-section-lower">
          <h2 className="ScoreTable-Title">Lower</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow comment={"Sum all dice if three are the same"} name="Three of Kind" score={scores.threeOfKind} doScore={evt => doScore("threeOfKind", threeOfKind.evalRoll)} />
              <RuleRow comment={"Sum all dice if for are the same"} name="Four of Kind" score={scores.fourOfKind} doScore={evt => doScore("fourOfKind", fourOfKind.evalRoll)} />
              <RuleRow comment={"25 points for a full house"} name="Full House" score={scores.fullHouse} doScore={evt => doScore("fullHouse", fullHouse.evalRoll)} />
              <RuleRow comment={"30 points for a small straight"} name="Small Straight" score={scores.smallStraight} doScore={evt => doScore("smallStraight", smallStraight.evalRoll)} />
              <RuleRow comment={"40 points for a large straight"} name="Large Straight" score={scores.largeStraight} doScore={evt => doScore("largeStraight", largeStraight.evalRoll)} />
              <RuleRow comment={"50 points for Yahtzee"} name="Yahtzee" score={scores.yahtzee} doScore={evt => doScore("yahtzee", yahtzee.evalRoll)} />
              <RuleRow comment={"Sum of all dice"} name="Chance" score={scores.chance} doScore={evt => doScore("chance", chance.evalRoll)} />
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default ScoreTable;