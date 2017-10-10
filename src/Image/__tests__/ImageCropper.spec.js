/* eslint-env jest */
import React from 'react';
import enzymeToJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ImageCropper, { ImageCropperRenderer } from '../ImageCropper';

const defaultProps = {
  ...ImageCropperRenderer.defaultProps,
  image: { preview: 'http://pic.example.com/200/200' },
};

describe('<ImageCropper {...props} />: elements tree', () => {
  test('with default props', () => {
    const wrapper = shallow(<ImageCropper {...defaultProps} />).until(ImageCropperRenderer);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  test('with scale controlled', () => {
    const props = {
      ...defaultProps,
      scale: 2,
    };
    const wrapper = shallow(<ImageCropper {...props} />).until(ImageCropperRenderer);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
});
