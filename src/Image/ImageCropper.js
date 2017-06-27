import React from 'react';
import T from 'prop-types';
import { compose, withHandlers } from 'recompose';

import AvatarEditor from 'react-avatar-editor';
import Slider from 'material-ui/Slider';

import withStates from '../hocs/withStates';

const staticProps = {
  slider: {
    min: 1,
    max: 2,
  },
  cropper: {
    crossOrigin: 'anonymous',
    border: 34,
    color: [222, 222, 222, 0.6],
    rotate: 0,
  },
};

const styles = {
  slider: { margin: '5px 0' },
};

const ImageCropperRenderer = ({ image, scale, refEditor, onScaleChange }) => (
  <div>
    <AvatarEditor
      {...staticProps.cropper}
      image={image && image.preview}
      ref={refEditor}
      scale={scale}
    />
    <Slider
      {...staticProps.slider}
      value={scale}
      sliderStyle={styles.slider}
      onChange={onScaleChange}
    />
  </div>
);

ImageCropperRenderer.propTypes = {
  image: T.shape({
    preview: T.string.isRequired,
  }),
  scale: T.number,
  refEditor: T.func.isRequired,
  onScaleChange: T.func.isRequired,
};

ImageCropperRenderer.defaultProps = {
  image: {},
  scale: 1,
};

export const refEditor = ({ setEditor, resetState }) => editor =>
  setEditor(editor && Object.assign(editor, {
    reset: () => {
      editor.state.image = {}; // eslint-disable-line no-param-reassign
      resetState();
    },
    getDataUrl: () => editor.getImageScaledToCanvas().toDataURL(),
  }));

export const onScaleChange = ({ setScale }) => (e, scale) => {
  e.stopPropagation();
  setScale(scale);
};

export {
  ImageCropperRenderer,
};

const handlers = {
  refEditor,
  onScaleChange,
};

export const withImageCropper = compose(
  withStates(['scale']),
  withHandlers(handlers),
);

export default withImageCropper(ImageCropperRenderer);
