import React from 'react';
import T from 'prop-types';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

import Img from 'react-image';

import ImageCropper from './ImageCropper';
import ImageSelector from './ImageSelector';

const styles = {
  root: { maxWidth: 300 },
  content: { maxHeight: 300, paddingBottom: 0 },
  cancelButton: { marginRight: 0, minWidth: 85 },
  loader: { marginBottom: 5 },
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
        <ImageCropper image={image} setScale={setScale} setEditor={setEditor} scale={scale} />
      ) : null}
      {uploaded ? <Img width="100%" height="100%" src={url} /> : null}
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
          labelPosition="before"
        >
          <ImageSelector setImage={setImage} />
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
