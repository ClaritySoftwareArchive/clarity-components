import React from 'react';
import T from 'prop-types';
import { Card, CardText, ListItem } from 'material-ui';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import asAccordionItem from './asAccordionItem';
import { stylePropType } from './constants';

export const AccordionItemRenderer = ({
  style,
  contentStyle,
  wide,
  expanded,
  onExpand,
  onCollapse,
  title,
  children,
}) => (
  <Card style={style}>
    <ListItem
      primaryText={title}
      onClick={wide && expanded ? onCollapse : onExpand}
      leftIcon={!wide && expanded ? <CloseIcon onClick={onCollapse} /> : null}
    />
    <CardText style={contentStyle}>
      {children}
    </CardText>
  </Card>
);

AccordionItemRenderer.propTypes = {
  style: stylePropType,
  contentStyle: stylePropType,
  wide: T.bool,
  expanded: T.bool,
  onExpand: T.func,
  onCollapse: T.func,
  title: T.string,
  children: T.node,
};

AccordionItemRenderer.defaultProps = {
  style: {},
  contentStyle: {},
  wide: undefined,
  expanded: undefined,
  onExpand: undefined,
  onCollapse: undefined,
  title: undefined,
  children: undefined,
};

export default asAccordionItem(AccordionItemRenderer);
