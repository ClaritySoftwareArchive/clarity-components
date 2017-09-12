import React from 'react';
import { compose, mapProps, withHandlers } from 'recompose';
import _ from 'lodash';

import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import { MuiThemeProvider } from 'material-ui';
import { Collapse } from 'antd';

import { Accordion, AccordionItem, asAccordion, asAccordionItem } from '../../src/Accordion';

storiesOf('Accordion', module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>)
  .add('Accordion(mui)', () => {
    const wide = boolean('wide screen', false);
    const listSize = number('list size', 10);
    const list = _.fill(Array(listSize), '1').map((value, index) => index + 1);

    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <div>Accordion List</div>
        <Accordion wide={wide}>
          {list.map(value => (
            <AccordionItem
              key={value}
              title={`title-${value}`}
            >
              {_.padEnd(`content-${value}: `, 300, 'blabla ')}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  })
  .add('antd', () => {
    const wide = boolean('wide screen', false);
    const list = [1, 2, 3, 4, 5];

    const Container = compose(
      asAccordion,
      withHandlers({ onChange: ({ onActivate }) => key => onActivate(undefined, key) }),
    )(Collapse);

    const border = '1px solid #d9d9d9';
    const itemPropsMapper = ({ activeKey, isLast, itemKey, expanded, style, ...rest }) => {
      const rootStyle = { ...style, border, borderBottom: 0 };

      if (isLast || expanded || activeKey - itemKey === 1) {
        rootStyle.borderBottom = border;
      }

      return {
        ...rest,
        isActive: expanded,
        style: rootStyle,
      };
    };

    const Item = compose(
      asAccordionItem,
      mapProps(itemPropsMapper),
    )(Collapse.Panel);


    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
        <Container style={{ border: 0 }} accordion wide={wide}>
          {list.map(value => (
            <Item
              key={value}
              header={`title-${value}`}
            >
              {_.padEnd(`content-${value}: `, 300, 'blabla ')}
            </Item>
          ))}
        </Container>
      </div>
    );
  });

