import React from 'react';
import { expect } from 'chai';

import setup from '../test-utils/component.setup';
import Element from '../components/element.jsx';

const props = {
  id: 5,
  backgroundColor: '#FFF',
  color: '#F1F1F1',
  name: 'test name 1'
};

// Element Component test cases
describe('<Element />', () => {
  const { shallowRender } = setup(props, Element);

  it('Verify correct attributes passed from props', () => {
    const propsName = shallowRender.find('div').text();
    const divAttributes = shallowRender.render().children()['0'].attribs;

    expect(propsName).to.equal(props.name);
    expect(divAttributes.style).to.equal(
        `background-color:${props.backgroundColor};color:${props.color};`
      );
    expect(divAttributes['data-id']).to.equal('' + props.id)
  });
});
