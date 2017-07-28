import { compose, withProps } from 'recompose';
import { embedHandler } from 'react-render-counter/hocs';

const uniquify = uniqueHoc => (Component) => {
  const hocs = Component.hocs || [];
  if (hocs.find(hoc => hoc === uniqueHoc)) {
    return Component;
  }
  const EnhancedComponent = uniqueHoc(Component);
  EnhancedComponent.hocs = hocs.concat(uniqueHoc);

  return EnhancedComponent;
};

const propsMapper = ({ onActivate, activeKey, itemKey }) => ({
  expanded: activeKey === itemKey,
  collapsed: activeKey != null && activeKey !== itemKey,
  onExpand: event => onActivate(event, itemKey),
  onCollapse: event => onActivate(event, null),
});

const asAccordionItem = compose(
  embedHandler('onActivate', 'onToggle'),
  withProps(propsMapper),
);

export default uniquify(asAccordionItem);
