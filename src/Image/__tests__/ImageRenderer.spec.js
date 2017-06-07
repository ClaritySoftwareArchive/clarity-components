/* eslint-env jest */
import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';

import { LinearProgress } from 'material-ui';
import Img from 'react-image';

import ImageRenderer from '../ImageRenderer';
import ImageCropper from '../ImageCropper';
import ImageSelector from '../ImageSelector';
import testExpectedProps from './testExpectedProps';

const url = 'https://pics.example.com/200/100';
const image = { preview: url };
const onUpload = jest.fn();
const openEditor = jest.fn();
const reset = jest.fn();
const setImage = jest.fn();
const setScale = jest.fn();
const setEditor = jest.fn();

const defaultProps = {
  onUpload,
  openEditor,
  reset,
  setImage,
  setScale,
  setEditor,
};

const entityOptions = {
  Selector: {
    selector: ImageSelector,
    staticProps: { setImage },
  },
  Cropper: {
    selector: ImageCropper,
    staticProps: { scale: 1, image, setScale, setEditor },
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
    staticProps: { primary: true, labelPosition: 'before', containerElement: 'label' },
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
    Selector: [{ }],
    SelectButton: [{ label: 'Select Image' }],
    ResetButton: [{ disabled: true }],
  },
}, {
  desc: 'with cropping props after selected an image',
  props: {
    image,
    cropping: true,
    scale: 2,
  },
  entitiesWithProps: {
    Selector: [{ }],
    SelectButton: [{ label: 'Change' }],
    ResetButton: [{ disabled: false }],
    Cropper: [{ image, scale: 2 }],
    UploadButton: [{ disabled: false, label: 'Upload' }],
  },
}, {
  desc: 'with uploading props',
  props: {
    image,
    cropping: true,
    scale: 2,
    uploading: true,
  },
  entitiesWithProps: {
    Selector: [{ }],
    SelectButton: [{}],
    ResetButton: [{ disabled: false }],
    Cropper: [{ image, scale: 2 }],
    UploadButton: [{ disabled: true, label: 'Upload' }],
    Loader: [{}],
  },
}, {
  desc: 'with uploaded props',
  props: {
    image,
    url,
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
    image,
    cropping: true,
    scale: 2,
    failed: true,
  },
  entitiesWithProps: {
    Selector: [{ }],
    SelectButton: [{}],
    ResetButton: [{ disabled: false }],
    Cropper: [{ image, scale: 2 }],
    UploadButton: [{ disabled: false, label: 'Retry' }],
  },
}, {
  desc: 'crop after upload succeed',
  props: {
    image,
    url,
    cropping: true,
  },
  entitiesWithProps: {
    Selector: [{ }],
    SelectButton: [{ label: 'Change' }],
    Cropper: [{ image, scale: 1 }],
    UploadButton: [{ disabled: false, label: 'Upload' }],
    ResetButton: [{ disabled: false }],
  },
}];

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
