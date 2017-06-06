/* eslint-env jest */
import createObjectURL from '../createObjectURL';

test('createObjectURL calls window.URL.createObjectURL', () => {
  const file = {};
  window.URL.createObjectURL = jest.fn();
  createObjectURL(file);
  expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
  expect(window.URL.createObjectURL).toHaveBeenCalledWith(file);
});
