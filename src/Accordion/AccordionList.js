import React from 'react';
import T from 'prop-types';

const styles = {
  list: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  expanded: {
    height: '100%',
  },
  wide: {
    width: '95%',
    margin: '0 auto',
  },
};

const AccordionList = ({ wide, expanded, children }) => (
  <div style={{
    ...styles.list,
    ...(styles[expanded ? 'expanded' : 'list']),
    ...(styles[wide ? 'wide' : 'list']),
  }}
  >
    {children}
  </div>
);

AccordionList.propTypes = {
  wide: T.bool.isRequired,
  expanded: T.bool.isRequired,
  children: T.node,
};

AccordionList.defaultProps = {
  children: undefined,
};


export default AccordionList;
