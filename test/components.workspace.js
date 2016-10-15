import React from 'react';
import { expect } from 'chai';

import setup from '../test-utils/component.setup';
import Workspace from '../components/workspace.jsx';
import { rollerData } from '../data';


// <Roller /> Component test cases
describe('<Workspace />', () => {
  const { shallowRender } = setup({}, Workspace);

  it('Verify correct number of <Roller />\'s rendered', () => {
    // account for additional center bar element
    expect(shallowRender.find('#slot-machine').children().length).to.equal(4);
  });

  it('Verify existance of Spin button', () => {
    expect(shallowRender.find('button.btn-positioning').text()).to.equal('Spin');
  });
});

describe('<Workspace /> unit tests', () => {
  const component = new Workspace({});

  it('Unit test onStartSlotMachine()', function(done) {
    this.timeout(3000);

    const onStartSlotMachine = component.onStartSlotMachine;
    const self = {
      isStarted: false,
      rollers: [
        {
          startRoller: function() { return true; }
        }
      ],
      onStopSlotMachine: function() {
        done();
      }
    };

    onStartSlotMachine.call(self);
  });

  it('Unit test onStopSlotMachine()', function(done) {
    this.timeout(10000);

    /* First simulate slot machine losing. Next simulate slot machine winning.
    * If both passes, pass this test case.
    */
    const onStopSlotMachine = component.onStopSlotMachine;

    let stopRollerCounter = 0;

    const self = {
      rollers: [
        {
          stopRoller: function() { stopRollerCounter++; }
        },
        {
          stopRoller: function() { stopRollerCounter++; }
        },
        {
          stopRoller: function() { stopRollerCounter++; }
        }
      ],
      onUserWon: function() {
        done();
      },
      onUserLost: function() {
        expect(stopRollerCounter).to.equal(3);

        simUserWinning();
      }
    };

    // Simulate user losing
    self.didTheUserWin = function() { return false };

    onStopSlotMachine.call(self);

    function simUserWinning() {
      self.didTheUserWin = function() { return true };

      onStopSlotMachine.call(self);
    }
  });

})
