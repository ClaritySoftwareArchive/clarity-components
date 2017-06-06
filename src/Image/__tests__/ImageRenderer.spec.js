/* eslint-env jest */
import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';

import { LinearProgress, Slider } from 'material-ui';
import Img from 'react-image';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

import ImageRenderer from '../ImageRenderer';
import testExpectedProps from './testExpectedProps';

const onUpload = jest.fn();
const openEditor = jest.fn();
const reset = jest.fn();
const openSelector = jest.fn();

const entityOptions = {
  Selector: {
    selector: Dropzone,
  },
  Cropper: {
    selector: AvatarEditor,
  },
  CropSlider: {
    selector: Slider,
    staticProps: { min: 1, max: 2 },
  },
  Previewer: {
    selector: Img,
    staticProps: { width: '100%', height: '100%' },
  },
  UploadButton: {
    selector: 'RaisedButton[name="Upload"]',
    staticProps: { secondary: true, onTouchTap: onUpload },
  },
  SelectButton: {
    selector: 'RaisedButton[name="Select"]',
    staticProps: { primary: true, onTouchTap: openSelector },
  },
  CropButton: {
    selector: 'RaisedButton[name="Crop"]',
    staticProps: { primary: true, label: 'Crop', onTouchTap: openEditor },
  },
  ResetButton: {
    selector: 'FlatButton[label="Reset"]',
    staticProps: { label: 'Reset', onTouchTap: reset },
  },
  Loader: {
    selector: LinearProgress,
  },
};

const renderModes = [{
  desc: 'with default props',
  props: {},
  entitiesWithProps: {
    Selector: [{ disableClick: false }],
    SelectButton: [{ label: 'Select Image' }],
    ResetButton: [{ disabled: true }],
  },
}, {
  desc: 'with cropping props after selected an image',
  props: {
    image: { preview: 'https://pics.example.com/200/100' },
    cropping: true,
    scale: 2,
  },
  entitiesWithProps: {
    Selector: [{ disableClick: true }],
    SelectButton: [{ label: 'Change' }],
    ResetButton: [{ disabled: false }],
    Cropper: [{ image: 'https://pics.example.com/200/100', scale: 2 }],
    CropSlider: [{ value: 2 }],
    UploadButton: [{ disabled: false, label: 'Upload' }],
  },
}, {
  desc: 'with uploading props',
  props: {
    image: { preview: 'https://pics.example.com/200/100' },
    cropping: true,
    scale: 2,
    uploading: true,
  },
  entitiesWithProps: {
    Selector: [{ disableClick: true }],
    SelectButton: [{}],
    ResetButton: [{ disabled: false }],
    Cropper: [{ image: 'https://pics.example.com/200/100', scale: 2 }],
    CropSlider: [{ value: 2 }],
    UploadButton: [{ disabled: true, label: 'Upload' }],
    Loader: [{}],
  },
}, {
  desc: 'with uploaded props',
  props: {
    image: { preview: 'https://pics.example.com/200/100' },
    url: 'https://pics.example.com/200/100',
    uploaded: true,
  },
  entitiesWithProps: {
    CropButton: [{}],
    ResetButton: [{ disabled: false }],
    Previewer: [{}],
  },
}, {
  desc: 'with failed (to upload) props',
  props: {
    image: { preview: 'https://pics.example.com/200/100' },
    cropping: true,
    scale: 2,
    failed: true,
  },
  entitiesWithProps: {
    Selector: [{ disableClick: true }],
    SelectButton: [{}],
    ResetButton: [{ disabled: false }],
    Cropper: [{ image: 'https://pics.example.com/200/100', scale: 2 }],
    CropSlider: [{ value: 2 }],
    UploadButton: [{ disabled: false, label: 'Retry' }],
  },
}];

const defaultProps = {
  onUpload,
  openEditor,
  reset,
  openSelector,
};

describe('ImageRenderer(props): [entities tree]', () => {
  const testRenderMode = ({ desc, props, entitiesWithProps }) => describe(desc, () => {
    const wrapper = shallow(<ImageRenderer {...defaultProps} {...props} />);

    const testEntitiesByOptions = ({ selector, staticProps }, componentName) => {
      const expectedEntities = entitiesWithProps[componentName] || [];
      const selectedEntities = wrapper.find(selector);

      it(`should render ${expectedEntities.length} entities of ${componentName}`, () => {
        expect(selectedEntities.length).toBe(expectedEntities.length);
      });

      const testExpectedEntity = (expectedProps, entityIndex) =>
        describe(`${entityIndex + 1}th entity of ${componentName}`, () => {
          const expectedEntityProps = { ...staticProps, ...expectedProps };
          const entityProps = selectedEntities.at(entityIndex).props();

          testExpectedProps(entityProps, expectedEntityProps);
        });

      _.forEach(expectedEntities, testExpectedEntity);
    };

    _.forEach(entityOptions, testEntitiesByOptions);
  });

  _.forEach(renderModes, testRenderMode);
});
