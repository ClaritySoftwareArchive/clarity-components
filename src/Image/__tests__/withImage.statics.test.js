/* eslint-env jest */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import T from 'prop-types';
import withImage from '../withImage';

describe('withImage(BaseComponent): NewComponent', () => {
  test('NewComponent has the extended statics of BaseComponent', () => {
    const BaseComponent = () => <div />;
    BaseComponent.propTypes = {
      onUpload: T.func,
      foo: T.string,
    };

    BaseComponent.defaultProps = {
      onUpload: jest.fn(),
      foo: '1',
    };

    const NewComponent = withImage(BaseComponent);

    expect(NewComponent).not.toBe(BaseComponent);
    expect({ ...NewComponent }).toMatchSnapshot();
  });
});
