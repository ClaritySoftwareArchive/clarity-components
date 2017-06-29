import React from 'react';
import T from 'prop-types';
import { compose, withHandlers } from 'recompose';

import AvatarEditor from 'react-avatar-editor';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import ImageRotateLeft from 'material-ui/svg-icons/image/rotate-left';
import ImageRotateRight from 'material-ui/svg-icons/image/rotate-right';


import withStates from '../hocs/withStates';

const editorBorder = 34;
const sliderMargin = 10;

const staticProps = {
  slider: {
    min: 1,
    max: 2,
  },
  cropper: {
    crossOrigin: 'anonymous',
    border: editorBorder,
    color: [222, 222, 222, 0.6],
    rotate: 0,
  },
  icon: {
    color: '#9e9e9e',
  },
};

const rotatorStyle = {
  position: 'absolute',
  top: 0,
  width: editorBorder,
  height: editorBorder,
  padding: (editorBorder - 24) / 2,
};

const styles = {
  root: { position: 'relative' },
  slider: {
    position: 'absolute',
    margin: sliderMargin,
    bottom: 0,
    width: `calc(100% - ${2 * sliderMargin}px)`,
  },
  leftRotator: { ...rotatorStyle, left: 0 },
  rightRotator: { ...rotatorStyle, right: 0 },
};

const ImageCropperRenderer = ({
  image,
  scale,
  rotate,
  refEditor,
  onRotateLeft,
  onRotateRight,
  onScaleChange,
}) => (
  <div style={styles.root}>
    <AvatarEditor
      {...staticProps.cropper}
      image={image && image.preview}
      ref={refEditor}
      scale={scale}
      rotate={rotate}
    />
    <Slider
      {...staticProps.slider}
      value={scale}
      sliderStyle={styles.slider}
      onChange={onScaleChange}
    />
    <IconButton style={styles.leftRotator} onTouchTap={onRotateLeft}>
      <ImageRotateLeft {...staticProps.icon} />
    </IconButton>
    <IconButton style={styles.rightRotator} onTouchTap={onRotateRight}>
      <ImageRotateRight {...staticProps.icon} />
    </IconButton>
  </div>
);

ImageCropperRenderer.propTypes = {
  image: T.shape({
    preview: T.string.isRequired,
  }),
  scale: T.number,
  rotate: T.number,
  refEditor: T.func.isRequired,
  onScaleChange: T.func.isRequired,
  onRotateLeft: T.func.isRequired,
  onRotateRight: T.func.isRequired,
};

ImageCropperRenderer.defaultProps = {
  image: {},
  scale: 1,
  rotate: 0,
};

const refEditor = ({ setEditor, resetState }) => editor =>
  setEditor(editor && Object.assign(editor, {
    reset: () => {
      editor.state.image = {}; // eslint-disable-line no-param-reassign
      resetState();
    },
    getDataUrl: (scaleToCanvas) => {
      const methodName = scaleToCanvas ? 'getImageScaledToCanvas' : 'getImage';
      return editor[methodName]().toDataURL();
    },
  }));

const onScaleChange = ({ setScale }) => (e, scale) => {
  e.stopPropagation();
  setScale(scale);
};

const onRotateLeft = ({ setRotate, rotate }) => (e) => {
  e.stopPropagation();
  setRotate((rotate - 90) % 360);
};

const onRotateRight = ({ setRotate, rotate }) => (e) => {
  e.stopPropagation();
  setRotate((rotate + 90) % 360);
};

export const handlers = {
  refEditor,
  onScaleChange,
  onRotateLeft,
  onRotateRight,
};

const withImageCropper = compose(
  withStates({ rotate: 0, scale: 1 }),
  withHandlers(handlers),
);

export {
  withImageCropper,
  ImageCropperRenderer,
};

const ImageCropper = withImageCropper(ImageCropperRenderer);
ImageCropper.displayName = 'ImageCropper';

export default ImageCropper;
