import React from 'react';
import _ from 'lodash';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { embedHandler } from 'react-render-counter/hocs';
import asAccordionItem from './asAccordionItem';

const propsMapper = ({ children, ...containerProps }) => {
  const toItem = (element, index) => {
    const Item = asAccordionItem(element.type);
    const defaultProps = element.type.defaultProps || {};
    const combinedProps = {
      ...containerProps,
      ..._.omitBy(element.props, (value, key) => value === defaultProps[key]),
    };

    if (combinedProps.itemKey == null) {
      combinedProps.itemKey = element.key == null ? index : element.key;
    }

    return <Item key={combinedProps.itemKey} {...combinedProps} />;
  };

  return {
    expanded: containerProps.activeKey != null,
    children: Array.isArray(children) ? children.map(toItem) : toItem(children),
  };
};

const onActivate = ({ activateKey }) => (event, value) => {
  if (event) {
    event.stopPropagation();
  }
  activateKey(value);
};

export default compose(
  withState('activeKey', 'activateKey'),
  withHandlers({ onActivate }),
  embedHandler('onActivate', 'onChange'),
  withProps(propsMapper),
);
