import React, { Component } from 'react';

// This Component can't render deeply, must work with shallow renderer.
// Recommend to use shallowWithUntil
const PropsDisplayer = props => (
  <div name="PropsDisplayer">
    <Component {...props} />
  </div>
);

export default PropsDisplayer;
