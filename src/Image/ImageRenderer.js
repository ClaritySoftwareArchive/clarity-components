import React from 'react';
import T from 'prop-types';
import find from 'lodash.find';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

import Img from 'react-image';
import AvatarEditor from 'react-avatar-editor';
import accepts from 'attr-accept';

import createObjectURL from './createObjectURL';

const styles = {
  root: { maxWidth: 300 },
  content: { maxHeight: 300, paddingBottom: 0 },
  cancelButton: { marginRight: 0, minWidth: 85 },
  loader: { marginBottom: 5 },
  slider: { margin: '5px 0' },
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

const staticProps = {
  selector: {
    type: 'file',
    accept: 'image/*',
    multiple: false,
  },
  cropper: {
    crossOrigin: 'anonymous',
    border: 34,
    color: [222, 222, 222, 0.6],
    rotate: 0,
  },
};

export const refEditor = setEditor => editor => setEditor(editor && Object.assign(editor, {
  reset: () => {
    editor.state.image = {}; // eslint-disable-line no-param-reassign
  },
  getDataUrl: () => editor.getImageScaledToCanvas().toDataURL(),
}));

export const onScaleChange = setScale => (e, scale) => {
  e.stopPropagation();
  setScale(scale);
};

export const onImageSelect = setImage => (event) => {
  const imgFile = find(event.target.files, file => accepts(file, staticProps.selector.accept));

  if (imgFile) {
    imgFile.preview = createObjectURL(imgFile);
    setImage(imgFile);
  }
};

const ImageRenderer = ({
  image,
  scale,
  url,
  cropping,
  failed,
  uploaded,
  uploading,
  onUpload,
  openEditor,
  reset,
  setEditor,
  setImage,
  setScale,
}) => (
  <Card style={styles.root}>
    <CardText style={styles.content}>
      {uploading ? <LinearProgress style={styles.loader} /> : null}
      {cropping ? (
        <div>
          <AvatarEditor
            {...staticProps.cropper}
            image={image && image.preview}
            ref={refEditor(setEditor)}
            scale={scale}
          />
          <Slider
            value={scale}
            min={1}
            max={2}
            sliderStyle={styles.slider}
            onChange={onScaleChange(setScale)}
          />
        </div>
      ) : null}
      {uploaded ? (
        <Img width="100%" height="100%" src={url} />
      ) : null}
    </CardText>
    <CardActions>
      {image && !uploaded ? (
        <RaisedButton
          name="Upload"
          secondary
          disabled={uploading}
          label={failed ? 'Retry' : 'Upload'}
          onTouchTap={onUpload}
        />
      ) : null}
      {uploaded ? (
        <RaisedButton name="Crop" primary label="Crop" onTouchTap={openEditor} />
      ) : (
        <RaisedButton
          name="Select"
          primary
          label={image ? 'Change' : 'Select Image'}
          containerElement="label"
        >
          <input
            {...staticProps.selector}
            onChange={onImageSelect(setImage)}
            style={styles.selector}
          />
        </RaisedButton>
      )}
      <FlatButton style={styles.cancelButton} disabled={!image} label="Reset" onTouchTap={reset} />
    </CardActions>
  </Card>
);

ImageRenderer.propTypes = {
  image: T.shape({
    preview: T.string.isRequired,
  }),
  scale: T.number,
  url: T.string,
  cropping: T.bool,
  failed: T.bool,
  uploaded: T.bool,
  uploading: T.bool,
  onUpload: T.func,
  openEditor: T.func,
  reset: T.func,
  setEditor: T.func,
  setImage: T.func,
  setScale: T.func,
};

ImageRenderer.defaultProps = {
  image: undefined,
  scale: 1,
  url: undefined,
  cropping: undefined,
  failed: undefined,
  uploaded: undefined,
  uploading: undefined,
  onUpload: undefined,
  openEditor: undefined,
  reset: undefined,
  setEditor: undefined,
  setImage: undefined,
  setScale: undefined,
};

export default ImageRenderer;
