/* eslint-env jest */
import _ from 'lodash';

export default (props, expectedProps) => {
  const testExpectedEntityProp = (expectedValue, propKey) => {
    const propValue = props[propKey];
    it(`should have expected prop ${propKey}`, () => {
      expect(propValue).toEqual(expectedValue);
    });
  };

  _.forEach(expectedProps, testExpectedEntityProp);
};
