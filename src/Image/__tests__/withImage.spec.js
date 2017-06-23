/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';
import withImage from '../withImage';

const url = 'http://pic.example.com/200/200';
const image = { preview: url };

describe('withImage(BaseComponent): NewComponent', () => {
  const BaseComponent = () => <div />;
  const NewComponent = withImage(BaseComponent);
  describe('start with default props', () => {
    test('waiting for user to select any image', () => {
      const wrapper = mount(<NewComponent />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('start with image preset', () => {
    test('cropping image', () => {
      const props = { image };
      const wrapper = mount(<NewComponent {...props} />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('uploading image', () => {
      const props = { image, uploading: true };
      const wrapper = mount(<NewComponent {...props} />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('failed to upload image', () => {
      const props = { image, failed: true };
      const wrapper = mount(<NewComponent {...props} />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('succeeded to upload image', () => {
      const props = { image, url };
      const wrapper = mount(<NewComponent {...props} />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('start with url preset', () => {
    test('previewing url', () => {
      const props = { url };
      const wrapper = mount(<NewComponent {...props} />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('cropping url', () => {
      const props = { url, uploaded: false };
      const wrapper = mount(<NewComponent {...props} />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
  });
});
