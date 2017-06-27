/* eslint-env jest */
import React from 'react';
import enzymeToJson from 'enzyme-to-json';
import { shallowWithUntil as shallow } from '../../utils/testHelpers/until';
import PropsDisplayer from '../../utils/testHelpers/PropsDisplayer';
import withImage from '../withImage';

const url = 'http://pic.example.com/200/200';
const image = { preview: url };

describe('withImage(BaseComponent): NewComponent', () => {
  const NewComponent = withImage(PropsDisplayer);

  describe('start with default props', () => {
    test('waiting for user to select any image', () => {
      const wrapper = shallow(<NewComponent />).until(PropsDisplayer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('start with image preset', () => {
    test('cropping image', () => {
      const props = { image };
      const wrapper = shallow(<NewComponent {...props} />).until(PropsDisplayer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('uploading image', () => {
      const props = { image, uploading: true };
      const wrapper = shallow(<NewComponent {...props} />).until(PropsDisplayer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('failed to upload image', () => {
      const props = { image, failed: true };
      const wrapper = shallow(<NewComponent {...props} />).until(PropsDisplayer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('succeeded to upload image', () => {
      const props = { image, url };
      const wrapper = shallow(<NewComponent {...props} />).until(PropsDisplayer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('start with url preset', () => {
    test('previewing url', () => {
      const props = { url };
      const wrapper = shallow(<NewComponent {...props} />).until(PropsDisplayer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
    test('cropping url', () => {
      const props = { url, uploaded: false };
      const wrapper = shallow(<NewComponent {...props} />).until(PropsDisplayer);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
    });
  });
});
