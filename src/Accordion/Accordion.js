import React from 'react';
import T from 'prop-types';
import AccordionList from './AccordionList';
import asAccordion from './asAccordion';

const Accordion = ({ activeKey, activateKey, onChange, wide, children }) => (
  <AccordionList wide={wide} expanded={activeKey != null}>
    {children.map((element) => {
      const onActivate = (event, value) => {
        activateKey(value);
        if (onChange || element.onExpand) {
          if (element.onExpand) element.onExpand(event, value);
          if (onChange) onChange(event, value);
        } else {
          event.stopPropagation();
        }
      };

      return (
        <element.type
          key={element.key}
          wide={wide}
          expanded={activeKey === element.key}
          collapsed={activeKey != null && activeKey !== element.key}
          {...element.props}
          onExpand={event => onActivate(event, element.key)}
          onCollapse={event => onActivate(event, null)}
        />
      );
    })}
  </AccordionList>
);

Accordion.propTypes = {
  wide: T.bool,
  activeKey: T.string,
  activateKey: T.func.isRequired,
  onChange: T.func,
  children: T.arrayOf(T.node),
};

Accordion.defaultProps = {
  wide: false,
  activeKey: null,
  onChange: undefined,
  children: [],
};

export default asAccordion(Accordion);
