import { compose, withProps, withHandlers, onlyUpdateForKeys } from 'recompose';
import { embedHandler } from 'react-render-counter/hocs';

const styles = {
  narrow: {
    default: {
      flex: 1,
      width: '100%',
      overflow: 'hidden',
      transition: 'all 0.2s ease-in',
      opacity: 1,
    },
    collapsed: {
      flex: 0,
      transition: 'all 0.2s ease-out',
      opacity: 0,
    },
    expanded: {
      flex: 2,
      transition: 'all 0.2s ease-out',
      opacity: 1,
    },
  },
  wide: {
    default: {
      width: '100%',
    },
    collapsed: {
      margin: 0,
      transition: 'all 0.2s ease-out',
      width: '100%',
    },
    expanded: {
      marginTop: 50,
      marginBottom: 50,
      width: 'calc(100% + 40px)',
      transition: 'all 0.2s ease-in',
    },
  },
};

const contentStyles = {
  default: {
    overflow: 'hidden',
  },
  collapsed: {
    transition: 'all 0.2s ease-in',
    padding: 0,
    maxHeight: 0,
    opacity: 0,
  },
  expanded: {
    transition: 'all 0.2s ease-out',
    maxHeight: '100vh',
    opacity: 1,
  },
};

const stylesMapper = ({
  wide, expanded, collapsed, style, isFirst, animation,
}) => {
  const rootStyles = styles[wide ? 'wide' : 'narrow'];
  const rootStyle = { ...rootStyles.default };
  const contentStyle = {
    ...contentStyles.default,
    ...contentStyles[expanded ? 'expanded' : 'collapsed'],
  };

  if (expanded) {
    Object.assign(rootStyle, rootStyles.expanded);
    if (isFirst) {
      delete rootStyle.marginTop;
    }
  }
  if (collapsed) {
    Object.assign(rootStyle, rootStyles.collapsed);
  }

  if (!animation) {
    rootStyle.transition = 'unset';
    contentStyle.transition = 'unset';
  }

  return {
    style: { ...rootStyle, ...style },
    contentStyle,
  };
};

const propsMapper = ({ activeKey, itemKey, animation = true }) => ({
  expanded: activeKey === itemKey,
  collapsed: activeKey != null && activeKey !== itemKey,
  animation,
});

export const handlers = {
  onExpand: ({ onActivate, itemKey }) => event => onActivate(event, itemKey),
  onCollapse: ({ onActivate }) => event => onActivate(event, null),
};

const asAccordionItem = compose(
  withProps(propsMapper),
  onlyUpdateForKeys(['expanded', 'wide', 'collapsed', 'title', 'children']),
  embedHandler('onActivate', 'onToggle'),
  withHandlers(handlers),
  withProps(stylesMapper),
);

const uniquify = uniqueHoc => (Component) => {
  const hocs = Component.hocs || [];
  if (hocs.find(hoc => hoc === uniqueHoc)) {
    return Component;
  }
  const EnhancedComponent = uniqueHoc(Component);
  EnhancedComponent.hocs = hocs.concat(uniqueHoc);

  return EnhancedComponent;
};

export default uniquify(asAccordionItem);
