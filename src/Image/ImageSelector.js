import React from 'react';
import find from 'lodash.find';
import T from 'prop-types';
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

const ImageSelector = ({ onImageSelect }) => (
  <input
    {...staticProps.selector}
    onChange={onImageSelect}
    style={styles.selector}
  />
);

ImageSelector.propTypes = {
  onImageSelect: T.func.isRequired,
};

export const onImageSelect = ({ setImage }) => (event) => {
  const imgFile = find(event.target.files, file => accepts(file, staticProps.selector.accept));

  if (imgFile) {
    imgFile.preview = createObjectURL(imgFile);
    setImage(imgFile);
  }
};

export default withHandlers({
  onImageSelect,
})(ImageSelector);
