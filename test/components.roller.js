import React from 'react';
import { expect } from 'chai';

import setup from '../test-utils/component.setup';
import Roller from '../components/roller.jsx';
import { moveRollerPositionY, shiftElementPosition } from '../components/roller.jsx';
import { rollerData } from '../data';


const props = {
  elements: rollerData[0]
};

// <Roller /> Component test cases
describe('<Roller />', () => {
  const { shallowRender } = setup(props, Roller);

  it('Verify correct number of <Element />\'s rendered', () => {
    expect(shallowRender.find('div.roller').children().length).to.equal(3);
  });

  it('Should show the correct element populated', () => {
    [0, 1, 2].forEach(index => {
      const node = shallowRender.find('div.roller').childAt(index).node;

      expect(node.props.name).to.equal(props.elements[index].name);
    });
  });
});

describe('<Roller /> unit tests', () => {
  const setState = function(obj) {
    this.state = Object.assign({}, this.state, obj);
  };

  const mockState1 = {
    state: {
      top: 0,
      elements: [1,2,3]
    }
  };

  mockState1.setState = setState;

  it('tests moveRollerPositionY()', () => {
    moveRollerPositionY.call(mockState1, 10);

    expect(mockState1.state.top).to.equal(10);
  });

  it('tests shiftElementPosition()', () => {
    shiftElementPosition.call(mockState1);

    expect(mockState1.state.elements).to.deep.equal([3,1,2]);
  });

  it ('tests getWinningElement()', () => {
    const mockState2 = {
      roller: {
        style: {
          top: '0px'
        },
      },
      state: {
        top: 0,
        elements: [
          {
            props: {
              winnings: 'a'
            }
          },
          {
            props: {
              winnings: 'b'
            }
          },
          {
            props: {
              winnings: 'c'
            }
          },
        ],
      }
    }

    const component = new Roller(props);
    const getWinningElement = component.getWinningElement;

    mockState2.roller.style.top = '0px';
    expect(getWinningElement.call(mockState2)).to.equal('b');

    mockState2.roller.style.top = '85px';
    expect(getWinningElement.call(mockState2)).to.equal(null);

    mockState2.roller.style.top = '160px';
    expect(getWinningElement.call(mockState2)).to.equal('a');
  });
});
