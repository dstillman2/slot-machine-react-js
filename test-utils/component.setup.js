import React from 'react';

import { shallow } from 'enzyme';
// import jsdom from 'jsdom';
//
// // Set up global virtual DOM
// global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.window = global.document.defaultView;

// Component setup
function setup(props, Component) {
  const component = <Component {...props} />;

  const shallowRender = shallow(component);
  // const fullRender = mount(component);

  return {
    props,
    shallowRender,
    // fullRender
  };
}

export default setup;
