import React from 'react';
import T from 'prop-types';
import Image from 'react-image';
import LightBox from 'react-image-lightbox';
import { compose, withState, withHandlers } from 'recompose';
import { omitProps, embedHandler } from 'react-render-counter/hocs';

const styles = {
  root: { width: '100%', height: '100%' },
};

const ImagePreviewerRenderer = ({ src, open, openLightBox, closeLightBox, ...rest }) => (
  <div style={styles.root}>
    <Image {...rest} src={src} onClick={openLightBox} />
    {open ? <LightBox mainSrc={src} onCloseRequest={closeLightBox} /> : null }
  </div>
);

ImagePreviewerRenderer.propTypes = {
  closeLightBox: T.func,
  open: T.bool,
  openLightBox: T.func,
  src: T.string.isRequired,
};

ImagePreviewerRenderer.defaultProps = {
  closeLightBox: undefined,
  open: false,
  openLightBox: undefined,
};

export const handlers = {
  openLightBox: ({ onSetOpen }) => () => onSetOpen(true),
  closeLightBox: ({ onSetOpen }) => () => onSetOpen(false),
};

const withImagePreviewer = compose(
  withState('open', 'setOpen', ({ initialOpen }) => initialOpen),
  embedHandler('setOpen', 'onSetOpen'),
  withHandlers(handlers),
  omitProps(['setOpen', 'onSetOpen']),
);

export {
  ImagePreviewerRenderer,
  withImagePreviewer,
};

const ImagePreviewer = withImagePreviewer(ImagePreviewerRenderer);
ImagePreviewer.displayName = 'ImagePreviewer';

export default ImagePreviewer;
