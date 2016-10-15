import React from 'react';
import { expect } from 'chai';

import setup from '../test-utils/component.setup';
import Modal from '../components/modal.jsx';

const props = {
  content: 'test content',
};

// Element Component test cases
describe('<Modal />', () => {
  const { shallowRender } = setup(props, Modal);

  it('Verify correct attributes passed from props', () => {
    const propsContent = shallowRender.find('div.content').text();

    expect(propsContent).to.equal(props.content);
  });
});
