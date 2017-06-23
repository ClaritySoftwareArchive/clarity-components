import React from 'react';
import T from 'prop-types';
import withHandlers from 'recompose/withHandlers';

import AvatarEditor from 'react-avatar-editor';
import Slider from 'material-ui/Slider';

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

const ImageCropper = ({ image, scale, refEditor, onScaleChange }) => (
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

ImageCropper.propTypes = {
  image: T.shape({
    preview: T.string.isRequired,
  }),
  scale: T.number,
  refEditor: T.func.isRequired,
  onScaleChange: T.func.isRequired,
};

ImageCropper.defaultProps = {
  image: {},
  scale: 1,
};

export const refEditor = ({ setEditor }) => editor => setEditor(editor && Object.assign(editor, {
  reset: () => {
    editor.state.image = {}; // eslint-disable-line no-param-reassign
  },
  getDataUrl: () => editor.getImageScaledToCanvas().toDataURL(),
}));

export const onScaleChange = ({ setScale }) => (e, scale) => {
  e.stopPropagation();
  setScale(scale);
};

export default withHandlers({
  refEditor,
  onScaleChange,
})(ImageCropper);