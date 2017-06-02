import React from 'react';
import T from 'prop-types';

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
  root: { maxWidth: 332 },
  content: { maxHeight: 310, paddingBottom: 0 },
  cancelButton: { marginRight: 0 },
  loader: { marginBottom: 5 },
  selector: {
    boxSizing: 'border-box',
    maxWidth: 298,
    maxHeight: 300,
    border: '1px solid #ededed',
    borderRadius: 2,
  },
  slider: { margin: '5px 0' },
};

const defaultProps = {
  selector: {
    accept: 'image/*',
    multiple: false,
  },
};

const ImageRenderer = ({
  image,
  uploading,
  cropping,
  uploaded,
  scale,
  setScale,
  setSelector,
  setEditor,
  openSelector,
  setImage,
  onUpload,
  setState,
  reset,
  url,
  failed,
}) => (
  <Card style={styles.root}>
    <CardText expandable={image && !cropping} style={styles.content}>
      {uploading ? <LinearProgress style={styles.loader} /> : null}
      <Dropzone
        {...defaultProps.selector}
        style={styles.selector}
        ref={setSelector}
        disableClick={!!image}
        onDrop={([imgFile]) => imgFile && setImage(imgFile)}
      >
        <AvatarEditor
          image={image && image.preview}
          crossOrigin="anonymous"
          ref={setEditor}
          border={34}
          scale={scale}
          color={image ? [222, 222, 222, 0.6] : [255, 255, 255, 0.6]}
          rotate={0}
        />
      </Dropzone>
      <Slider
        value={scale}
        min={1}
        max={2}
        sliderStyle={styles.slider}
        disabled={!cropping}
        onChange={(e, val) => {
          e.stopPropagation();
          setScale(val);
        }}
      />
    </CardText>
    <CardText expandable={!uploaded}>
      <Img width="100%" height="100%" src={url} />
    </CardText>
    <CardActions>
      {image && !uploaded ? (
        <RaisedButton secondary disabled={uploading} label={failed ? 'Retry' : 'Upload'} onTouchTap={onUpload} />
        ) : null}
      <RaisedButton
        primary
        label={image ? 'Change' : 'Select Image'}
        onTouchTap={uploaded ? () => setState({ uploaded: false }) : openSelector}
      />
      <FlatButton style={styles.cancelButton} disabled={!image} label="Reset" onTouchTap={reset} />
    </CardActions>
  </Card>
);

ImageRenderer.propTypes = {
  image: T.shape({
    preview: T.string.isRequired,
  }),
  url: T.string,
  scale: T.number.isRequired,
  uploading: T.bool.isRequired,
  uploaded: T.bool.isRequired,
  cropping: T.bool.isRequired,
  failed: T.bool.isRequired,
  setImage: T.func.isRequired,
  setScale: T.func.isRequired,
  onUpload: T.func.isRequired,
  setState: T.func.isRequired,
  reset: T.func.isRequired,
  setSelector: T.func.isRequired,
  openSelector: T.func.isRequired,
  setEditor: T.func.isRequired,
};

ImageRenderer.defaultProps = {
  image: undefined,
  url: undefined,
};

export default ImageRenderer;
