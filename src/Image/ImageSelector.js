import React from 'react';
import T from 'prop-types';
import _ from 'lodash';
import withHandlers from 'recompose/withHandlers';

import accepts from 'attr-accept';
import createObjectURL from './createObjectURL';

const staticProps = {
  selector: {
    type: 'file',
    accept: 'image/*',
    multiple: false,
  },
};

const styles = {
  selector: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const ImageSelectorRenderer = ({ onImageSelect }) => (
  <input
    {...staticProps.selector}
    onChange={onImageSelect}
    style={styles.selector}
  />
);

ImageSelectorRenderer.propTypes = {
  onImageSelect: T.func.isRequired,
};

const isValidImage = file => accepts(file, staticProps.selector.accept);

export const onImageSelect = ({ setImage }) => (event) => {
  const imgFile = _.find(event.target.files, isValidImage);

  if (imgFile) {
    imgFile.preview = createObjectURL(imgFile);
    setImage(imgFile);
  }
};

const withImageSelector = withHandlers({
  onImageSelect,
});

export {
  withImageSelector,
  ImageSelectorRenderer,
};

const ImageSelector = withImageSelector(ImageSelectorRenderer);
ImageSelector.displayName = 'ImageSelector';

export default ImageSelector;
