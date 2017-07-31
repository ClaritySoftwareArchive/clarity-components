import React from 'react';
import _ from 'lodash';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { embedHandler } from 'react-render-counter/hocs';
import asAccordionItem from './asAccordionItem';

const rootStyles = {
  default: {
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

const stylesMapper = ({ wide, expanded, style }) => {
  const rootStyle = { ...rootStyles.default };
  if (wide) {
    Object.assign(rootStyle, rootStyles.wide);
  }
  if (expanded) {
    Object.assign(rootStyle, rootStyles.expanded);
  }

  return {
    style: { ...rootStyle, ...style },
  };
};

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

    return (
      <Item
        key={combinedProps.itemKey}
        isFirst={!Array.isArray(children) || index === 0}
        isLast={!Array.isArray(children) || index === children.length - 1}
        {...combinedProps}
      />
    );
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
  withState('activeKey', 'activateKey', ({ defaultActiveKey }) => defaultActiveKey),
  withHandlers({ onActivate }),
  embedHandler('onActivate', 'onChange'),
  withProps(propsMapper),
  withProps(stylesMapper),
);
