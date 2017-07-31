/* eslint-env jest */
import _ from 'lodash';
import { handlers } from '../asAccordion';

const { onActivate } = handlers;

test('onActivate({ activateKey, ...props }): handler', () => {
  const event = { stopPropagation: jest.fn() };
  const activateKey = jest.fn();
  const handler = onActivate({ activateKey });

  const value = _.stubObject();
  handler(event, value);
  expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  expect(activateKey).toHaveBeenCalledTimes(1);
  expect(activateKey).toHaveBeenCalledWith(value);

  const anotherValue = _.stubObject();
  handler(undefined, value);
  expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  expect(activateKey).toHaveBeenCalledTimes(2);
  expect(activateKey).toHaveBeenCalledWith(anotherValue);
});
