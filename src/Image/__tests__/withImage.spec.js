/* eslint-env jest */
import snapshotHocProps from '../../utils/testHelpers/snapshotHocProps';
import withImage from '../withImage';

const url = 'http://pic.example.com/200/200';
const image = { preview: url };

describe('withImage(BaseComponent): NewComponent', () => {
  let props;

  afterEach(() => snapshotHocProps(withImage, props));

  describe('start with default props', () => {
    test('waiting for user to select any image', () => {
      props = {};
    });
  });

  describe('start with image preset', () => {
    test('cropping image', () => {
      props = { image };
    });
    test('uploading image', () => {
      props = { image, uploading: true };
    });
    test('failed to upload image', () => {
      props = { image, failed: true };
    });
    test('succeeded to upload image', () => {
      props = { image, url };
    });
  });

  describe('start with url preset', () => {
    test('previewing url', () => {
      props = { url };
    });
    test('cropping url', () => {
      props = { url, uploaded: false };
    });
  });
});
