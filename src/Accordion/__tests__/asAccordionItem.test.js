/* eslint-env jest */
import _ from 'lodash';
import { handlers } from '../asAccordionItem';

const { onCollapse, onExpand } = handlers;

test('onExpand({ onActivate, itemKey }): handler', () => {
  const onActivate = jest.fn();
  const itemKey = _.stubObject();
  const handler = onExpand({ onActivate, itemKey });

  const event = _.stubObject();
  handler(event);
  expect(onActivate).toHaveBeenCalledTimes(1);
  expect(onActivate).toHaveBeenCalledWith(event, itemKey);
});

test('onCollapse({ onActivate, itemKey }): handler', () => {
  const onActivate = jest.fn();
  const handler = onCollapse({ onActivate });

  const event = _.stubObject();
  handler(event);
  expect(onActivate).toHaveBeenCalledTimes(1);
  expect(onActivate).toHaveBeenCalledWith(event, null);
});
