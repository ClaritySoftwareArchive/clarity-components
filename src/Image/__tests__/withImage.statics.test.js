/* eslint-env jest */
import React from 'react';
import T from 'prop-types';
import withImage, { propTypes, defaultProps } from '../withImage';

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
    expect(NewComponent.displayName).toBe('withImage(BaseComponent)');
    expect(NewComponent.propTypes).toEqual({
      foo: T.string,
      initialState: propTypes.initialState,
      onUploadFail: T.func,
      onUploadStart: T.func,
      onUploadSucceed: T.func,
      uploadImage: T.func,
    });
    expect(NewComponent.defaultProps).toEqual({
      foo: '1',
      initialState: defaultProps.initialState,
    });
  });
});
