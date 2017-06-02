import React from 'react';
import T from 'prop-types';
import noop from 'lodash.noop';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

import Img from 'react-image';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const styles = {
  root: { maxWidth: 300 },
  content: { maxHeight: 300, paddingBottom: 0 },
  cancelButton: { marginRight: 0, minWidth: 85 },
  loader: { marginBottom: 5 },
  selector: {
    boxSizing: 'border-box',
    maxWidth: 268,
    maxHeight: 300,
    border: '1px solid #ededed',
    borderRadius: 2,
  },
  selectorContent: {
    width: '100%',
    height: 268,
  },
  slider: { margin: '5px 0' },
};

const defaultProps = {
  selector: {
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
  openSelector,
  reset,
  setEditor,
  setImage,
  setScale,
  setSelector,
}) => (
  <Card style={styles.root}>
    <CardText style={styles.content}>
      {uploading ? <LinearProgress style={styles.loader} /> : null}
      {!image || cropping ? (
        <Dropzone
          {...defaultProps.selector}
          style={styles.selector}
          ref={setSelector}
          disableClick={!!image}
          onDrop={([imgFile]) => imgFile && setImage(imgFile)}
        >
          {cropping ? (
            <div>
              <AvatarEditor
                {...defaultProps.cropper}
                image={image && image.preview}
                ref={setEditor}
                scale={scale}
              />
              <Slider
                value={scale}
                min={1}
                max={2}
                sliderStyle={styles.slider}
                onChange={(e, val) => {
                  e.stopPropagation();
                  setScale(val);
                }}
              />
            </div>
          ) : <div style={styles.selectorContent} />}
        </Dropzone>
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
        <RaisedButton name="Select" primary label={image ? 'Change' : 'Select Image'} onTouchTap={openSelector} />
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
  openSelector: T.func,
  reset: T.func,
  setEditor: T.func,
  setImage: T.func,
  setScale: T.func,
  setSelector: T.func,
};

ImageRenderer.defaultProps = {
  image: undefined,
  scale: 1,
  url: undefined,
  cropping: undefined,
  failed: undefined,
  uploaded: undefined,
  uploading: undefined,
  onUpload: noop,
  openEditor: noop,
  openSelector: noop,
  reset: noop,
  setEditor: noop,
  setImage: noop,
  setScale: noop,
  setSelector: noop,
};

export default ImageRenderer;
