import React from 'react';
import T from 'prop-types';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

import ImageCropper from './ImageCropper';
import ImageSelector from './ImageSelector';
import ImagePreviewer from './ImagePreviewer';

const styles = {
  root: { maxWidth: 300 },
  content: { maxHeight: 300, paddingBottom: 0 },
  resetAction: { marginRight: 0, minWidth: 85 },
  loader: { marginBottom: 5 },
};

const ImageRenderer = ({
  image,
  url,
  changeActionLabel,
  cropActionLabel,
  cropping,
  failed,
  uploaded,
  uploading,
  onUpload,
  openEditor,
  reset,
  resetActionLabel,
  retryActionLabel,
  selectActionLabel,
  setEditor,
  onSetImage,
  uploadActionLabel,
}) => (
  <Card style={styles.root}>
    <CardText style={styles.content}>
      {uploading ? <LinearProgress style={styles.loader} /> : null}
      {cropping ? (
        <ImageCropper image={image} setEditor={setEditor} />
      ) : null}
      {uploaded ? <ImagePreviewer width="100%" height="100%" src={url} /> : null}
    </CardText>
    <CardActions>
      {image && !uploaded ? (
        <RaisedButton
          name="Upload"
          secondary
          disabled={uploading}
          label={failed ? retryActionLabel : uploadActionLabel}
          onTouchTap={onUpload}
        />
      ) : null}
      {uploaded ? (
        <RaisedButton name="Crop" primary label={cropActionLabel} onTouchTap={openEditor} />
      ) : null}
      <RaisedButton
        name="Select"
        primary
        label={image ? changeActionLabel : selectActionLabel}
        labelPosition="before"
      >
        <ImageSelector setImage={onSetImage} />
      </RaisedButton>
      <FlatButton
        style={styles.resetAction}
        disabled={!image}
        label={resetActionLabel}
        onTouchTap={reset}
      />
    </CardActions>
  </Card>
);

ImageRenderer.propTypes = {
  image: T.shape({
    preview: T.string.isRequired,
  }),
  url: T.string,
  changeActionLabel: T.string,
  cropActionLabel: T.string,
  cropping: T.bool,
  failed: T.bool,
  uploaded: T.bool,
  uploading: T.bool,
  onUpload: T.func,
  openEditor: T.func,
  reset: T.func,
  resetActionLabel: T.string,
  retryActionLabel: T.string,
  selectActionLabel: T.string,
  setEditor: T.func,
  onSetImage: T.func,
  uploadActionLabel: T.string,
};

ImageRenderer.defaultProps = {
  image: undefined,
  url: undefined,
  changeActionLabel: 'Change',
  cropActionLabel: 'Crop',
  cropping: undefined,
  failed: undefined,
  uploaded: undefined,
  uploading: undefined,
  onUpload: undefined,
  openEditor: undefined,
  reset: undefined,
  resetActionLabel: 'Reset',
  retryActionLabel: 'Retry',
  selectActionLabel: 'Select Image',
  setEditor: undefined,
  onSetImage: undefined,
  uploadActionLabel: 'Upload',
};

export default ImageRenderer;
