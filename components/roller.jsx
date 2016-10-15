import React from 'react';
import Element from './element.jsx';


class Roller extends React.Component {
  constructor(props) {
    super(props);

    this.state = { top: 0 };
  }

  componentWillMount() {
    /* Initialize 3 elements in the roller. Each element has an associated color
    * and name attribute.
    */
    const elements = [];

    this.props.elements.forEach((props, index) => {
      elements.push(
        <Element {...props} key={index} />
      )
    })

    this.setState({
      elements
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startRoller() {
    // Note: interval must be set at 0 ms for FF cross-browser compatability
    this.interval = setInterval(() => {
      // On every tick, move the position of the roller down by 14px
      moveRollerPositionY.call(this, 14);
    }, 0);
  }

  stopRoller() {
    // Clearing the interval immediately stops the roller
    clearInterval(this.interval);
  }

  getWinningElement() {
    /* Calculates the rolling position by relating the top position of the roller
    * to the element position on the roller. In situations where results are too
    * to close call, the player does not win (this should be standard slot machine
    * behavior).
    */
    const rollerPosition = Number(this.roller.style.top.slice(0, -2));

    let winningElement;

    if (rollerPosition >= 0 && rollerPosition <= 80) {
      winningElement = this.state.elements[1].props.winnings;
    } else if (rollerPosition >= 90 && rollerPosition <= 168) {
      winningElement = this.state.elements[0].props.winnings;
    } else {
      // Too close to call, there is no winner. Return null;
      return null;
    }

    return winningElement;
  }

  render() {
    return (
      <div ref={c => this.roller = c}
           className="roller"
           style={{top: this.state.top}}>
        {this.state.elements}
      </div>
    );
  }
}


function moveRollerPositionY(y=1) {
  /* Shifts the position of the roller downwards relative to top: 0px; If the
  * roller goes beyond 168px, we shift the position.
  */
  const topPosition = this.state.top;

  if (topPosition >= 168) {
    shiftElementPosition.call(this);
    this.setState({ top: 0 });

    return;
  }

  this.setState({
    top: topPosition + y
  });
}


function shiftElementPosition() {
  /* Pop element out, add to front of array, then setState to regenerate the
  * element positionings.
  */
  const newElements = this.state.elements;
  const element3 = newElements.pop();

  newElements.unshift(element3);

  this.setState({
    elements: newElements
  });
}

export default Roller;

export { moveRollerPositionY, shiftElementPosition }
