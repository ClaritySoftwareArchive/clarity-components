import React from 'react';
import _ from 'lodash';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { MuiThemeProvider } from 'material-ui';

import { Accordion, AccordionItem } from '../../src/Accordion';

storiesOf('Accordion', module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>)
  .add('draft', () => {
    const wide = boolean('wide screen', false);
    const list = [1, 2, 3, 4, 5];

    return (
      <div style={{ height: 'calc(100vh - 32px)' }}>
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
  });

