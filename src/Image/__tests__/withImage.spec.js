/* eslint-env jest */
import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import compose from 'recompose/compose';
import withImage from '../withImage';
import withPropsPeeker from '../../hocs/withPropsPeeker';
import testExpectedProps from './testExpectedProps';
import testExpectedHandlers from './testExpectedHandlers';

const url = 'http://pic.example.com/200/200';
const image = { preview: url };
const editor = {
  reset: jest.fn(),
  getDataUrl: () => url,
};
const selector = {
  open: jest.fn(),
};

const defaultMapMode = {
  inputProps: {},
  outputProps: {
    // props flattened from defaultState
    scale: 1,
    failed: false,
    uploading: false,
    // props generated from propsMapper
    cropping: false,
    image: undefined,
    url: undefined,
    uploaded: false,
  },
};

const handlerMirror = _.mapKeys([
  'openEditor',
  'openSelector',
  'setEditor',
  'setImage',
  'setScale',
  'setSelector',
  'reset',
]/* , _.identity*/);

const mapModes = [{
  desc: 'with default props',
  // handler props
  handlersShouldCall: { ...handlerMirror, onUpload: [] },
}, {
  desc: 'with image prop',
  inputProps: { image },
  outputProps: { cropping: true, image },
}, {
  desc: 'with url prop',
  inputProps: { url },
  outputProps: { image, url, uploaded: true },
}, {
  desc: 'while uploading',
  inputProps: { image, uploading: true },
  outputProps: { image, cropping: true, uploading: true },
}, {
  desc: 'after upload failed',
  inputProps: { image, failed: true },
  outputProps: { image, cropping: true, failed: true },
}, {
  desc: 'if upload will succeed',
  handlersShouldCall: {
    onUpload: ['onUploadStart', 'uploadImage', 'onUploadSucceed'],
  },
  inputHandlers: {
    uploadImage: jest.fn(() => new Promise(resolve => resolve({ url }))),
  },
  inputProps: { editor },
}, {
  desc: 'if upload will fail',
  handlersShouldCall: {
    onUpload: ['onUploadStart', 'uploadImage', 'onUploadFail'],
  },
  inputHandlers: {
    uploadImage: jest.fn(() => new Promise((resolve, reject) => reject(new Error()))),
  },
  inputProps: { editor },
}, {
  desc: 'when reset is called',
  handlersShouldCall: { reset: [] },
  inputProps: { editor },
  postValidate: () => {
    test('editor.reset should be called', () => {
      expect(editor.reset).toHaveBeenCalledTimes(1);
    });
  },
}, {
  desc: 'when openSelector is called',
  handlersShouldCall: { openSelector: [] },
  inputProps: { selector },
  postValidate: () => {
    test('selector.open should be called', () => {
      expect(selector.open).toHaveBeenCalledTimes(1);
    });
  },
}];

describe('withImage(BaseComponent)(inputProps): outputProps', () => {
  const BaseComponent = () => <div />;

  const testMapMode = ({
    desc,
    inputProps,
    inputHandlers = {},
    outputProps,
    handlersShouldCall = {},
    postValidate,
  }) => describe(desc, () => {
    const peekedProps = {};
    const NewComponent = compose(
      withImage,
      withPropsPeeker(peekedProps),
    )(BaseComponent);

    const inputNames = _.flatten(_.values(handlersShouldCall));
    const handlers = {};
    inputNames.forEach((name) => {
      handlers[name] = inputHandlers[name] || jest.fn(() => jest.fn());
    });

    mount(<NewComponent {...inputProps} {...handlers} />);

    const expectedProps = { ...defaultMapMode.outputProps, ...outputProps };
    testExpectedProps(peekedProps, expectedProps);

    testExpectedHandlers(handlersShouldCall, peekedProps, handlers);

    if (postValidate) {
      postValidate();
    }
  });

  _.forEach(mapModes, testMapMode);
});
