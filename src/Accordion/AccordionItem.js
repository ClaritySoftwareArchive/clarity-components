import React from 'react';
import T from 'prop-types';
import { Card, CardTitle, CardText, ListItem } from 'material-ui';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

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
    collapsed: {
      margin: 0,
      transition: 'all 0.2s ease-out',
      width: '100%',
    },
    expanded: {
      margin: '50px 0',
      width: 'calc(100% + 40px)',
      transition: 'all 0.2s ease-in',
    },
  },
  title: {
    padding: 0,
  },
  content: {
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
  },
};

const AccordionItem = ({ wide, expanded, collapsed, onExpand, onCollapse, title, children }) => (
  <Card
    style={{
      ...styles[wide ? 'wide' : 'narrow'].default,
      ...styles[wide ? 'wide' : 'narrow'][expanded ? 'expanded' : 'default'],
      ...styles[wide ? 'wide' : 'narrow'][collapsed ? 'collapsed' : 'default'],
    }}
  >
    <CardTitle style={styles.title}>
      <ListItem
        primaryText={title}
        onTouchTap={wide && expanded ? onCollapse : onExpand}
        leftIcon={!wide && expanded ? <CloseIcon onTouchTap={onCollapse} /> : null}
      />
    </CardTitle>
    <CardText style={{ ...styles.content.default, ...styles.content[expanded ? 'expanded' : 'collapsed'] }}>
      {children}
    </CardText>
  </Card>
);

AccordionItem.propTypes = {
  wide: T.bool.isRequired,
  expanded: T.bool.isRequired,
  collapsed: T.bool.isRequired,
  onExpand: T.func.isRequired,
  onCollapse: T.func.isRequired,
  title: T.string,
  children: T.node,
};

AccordionItem.defaultProps = {
  title: undefined,
  children: undefined,
};

export default AccordionItem;
