import React from 'react';
import T from 'prop-types';
import Image from 'react-image';
import LightBox from 'react-image-lightbox';
import Spinner from 'react-md-spinner';
import { compose, withState, withHandlers } from 'recompose';
import { omitProps, embedHandler } from 'react-render-counter/hocs';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  image: { width: '100%', height: '100%' },
};

const ImagePreviewerRenderer = ({
  src,
  style,
  modalZIndex,
  open,
  openLightBox,
  closeLightBox,
  ...rest
}) => (
  <div style={{ ...styles.root, ...style }}>
    <Image
      {...rest}
      style={styles.image}
      src={src}
      onClick={openLightBox}
      loader={<Spinner />}
    />
    {open ? (
      <LightBox
        mainSrc={src}
        onCloseRequest={closeLightBox}
        reactModalStyle={{
          overlay: { zIndex: modalZIndex },
        }}
      />
    ) : null }
  </div>
);

ImagePreviewerRenderer.propTypes = {
  closeLightBox: T.func,
  open: T.bool,
  openLightBox: T.func,
  src: T.string.isRequired,
  style: T.objectOf(T.any),
  modalZIndex: T.number,
};

ImagePreviewerRenderer.defaultProps = {
  closeLightBox: undefined,
  open: false,
  openLightBox: undefined,
  style: styles.image,
  modalZIndex: 9999,
};

export const handlers = {
  openLightBox: ({ onSetOpen }) => () => onSetOpen(true),
  closeLightBox: ({ onSetOpen }) => () => onSetOpen(false),
};

const withImagePreviewer = compose(
  withState('open', 'setOpen', ({ initialOpen }) => initialOpen),
  embedHandler('setOpen', 'onSetOpen'),
  withHandlers(handlers),
  omitProps(['setOpen', 'onSetOpen', 'initialOpen']),
);

export {
  ImagePreviewerRenderer,
  withImagePreviewer,
};

const ImagePreviewer = withImagePreviewer(ImagePreviewerRenderer);
ImagePreviewer.displayName = 'ImagePreviewer';

export default ImagePreviewer;
