/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import ImageRenderer from '../ImageRenderer';

const url = 'https://pics.example.com/200/100';
const image = { preview: url };
const onUpload = jest.fn();
const openEditor = jest.fn();
const reset = jest.fn();
const onSetImage = jest.fn();
const setScale = jest.fn();
const setEditor = jest.fn();

const defaultProps = {
  onUpload,
  openEditor,
  reset,
  onSetImage,
  setScale,
  setEditor,
};

describe('<ImageRenderer {...props} />: elements tree', () => {
  test('with default props', () => {
    const wrapper = shallow(<ImageRenderer {...defaultProps} />);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
  test('with cropping props after selected an image', () => {
    const props = {
      image,
      cropping: true,
      scale: 2,
    };
    const wrapper = shallow(<ImageRenderer {...defaultProps} {...props} />);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
  test('with uploading props', () => {
    const props = {
      image,
      cropping: true,
      scale: 2,
      uploading: true,
    };
    const wrapper = shallow(<ImageRenderer {...defaultProps} {...props} />);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
  test('with uploaded props', () => {
    const props = {
      image,
      url,
      uploaded: true,
    };
    const wrapper = shallow(<ImageRenderer {...defaultProps} {...props} />);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
  test('with failed (to upload) props', () => {
    const props = {
      image,
      cropping: true,
      scale: 2,
      failed: true,
    };
    const wrapper = shallow(<ImageRenderer {...defaultProps} {...props} />);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
  test('crop after upload succeed', () => {
    const props = {
      image,
      url,
      cropping: true,
    };
    const wrapper = shallow(<ImageRenderer {...defaultProps} {...props} />);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
});
