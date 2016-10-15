import React from 'react';

import Roller from './roller.jsx';
import Modal from './modal.jsx';

import { rollerData } from '../data';


class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.isStarted = false;
  }

  componentDidMount() {
    this.rollers = [
      this.roller1,
      this.roller2,
      this.roller3
    ];
  }

  onStartSlotMachine() {
    /* If the roller has already started, prevent the start button from being
    * triggered again. Added flag <isStarted>.
    */
    if (this.isStarted === false) {
      this.rollers.forEach(roller => {
        roller.startRoller();
      });

      this.isStarted = true;

      // After a short duration, stop the rollers.
      setTimeout(() => {
        this.onStopSlotMachine();
      }, 2000);
    }
  }

  onStopSlotMachine() {
    /* Stop the rollers in sequence. The first roller will stop immediately.
    * The second roller will stop after x seconds, and the third roller will stop
    * after x seconds after the second roller stops.
    */
    const stopRoller = ({ index, timeDelay }) => () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.rollers[index].stopRoller();

          resolve();
        }, timeDelay);
      });
    };

    stopRoller({ index: 0, timeDelay: 0 })()
      .then(stopRoller({ index: 1, timeDelay: 650 }))
      .then(stopRoller({ index: 2, timeDelay: 650 }))
      .then(() => {
        const item = this.didTheUserWin();

        if (item) {
          this.onUserWon(item);
        } else {
          this.onUserLost();
        }

        // Set isStarted flag to false so the user can play the slots again
        this.isStarted = false;
      });
  }

  didTheUserWin() {
    /* Checks the three elements. If their id's match, return what the user won.
    * Otherwise, return false;
    */
    const elements = [];

    let winningElement;

    this.rollers.forEach(roller => {
      elements.push(roller.getWinningElement());
    });

    if (elements[0] === elements[1] && elements[1] === elements[2]) {
      return elements[0];
    }

    return false;
  }

  onUserWon(item) {
    /* If the user wins, show a modal with a "winner" heading and let the user
    * know what they won.
    */
    const mapping = {
      'coffee': 'You won a Cup of Coffee!',
      'tea': 'You won a Cup of Tea!',
      'espresso': 'You won a Cup of Espresso!'
    };

    this.setState({ modalContent: mapping[item] });

    this.modal.openModal();
  }

  onUserLost() {
    /* If the user lost, show a brief message telling them they lost.
    */
    this.setState({
      showLosingMessage: true
    });

    setTimeout(() => this.setState({ showLosingMessage: false }), 1500);
  }

  render() {
    const rollers = [];

    rollerData.forEach((elements, index) => {
      rollers.push(
        <Roller key={index}
                ref={c => this['roller' + (index + 1)] = c}
                elements={elements} />
      );
    });

    return (
      <div>
        <div id="workspace">
          <div className="gradient top">
            {
              this.state.showLosingMessage ? (
                <div style={{width: '100%'}}>
                  <span className="losing-message text-center">
                    You lost! Try again.
                  </span>
                </div>
              ) : null
            }
          </div>
          <div id="slot-machine">
            <div className="center-bar"></div>
            {rollers}
          </div>
          <div className="gradient bottom">
            <button className="btn btn-primary btn-styling btn-positioning"
                    onClick={() => this.onStartSlotMachine()}>
              Spin
            </button>
          </div>
        </div>
        <Modal ref={c => this.modal = c}
               content={this.state.modalContent} />
      </div>
    );
  }
}

export default Workspace;
