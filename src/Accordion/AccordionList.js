import React from 'react';
import T from 'prop-types';
import { stylePropType } from './constants';

const AccordionList = ({ style, children }) => (
  <div style={style}>
    {children}
  </div>
);

AccordionList.propTypes = {
  style: stylePropType,
  children: T.node,
};

AccordionList.defaultProps = {
  style: {},
  children: undefined,
};


export default AccordionList;
