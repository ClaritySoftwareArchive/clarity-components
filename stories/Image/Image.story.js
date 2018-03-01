import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, select, number, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { MuiThemeProvider } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Image, ImagePreviewer } from '../../src';
// Needed for onClick
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const createUploadImage = ({
  log = action('upload image'),
  printable,
  willFail,
  delay = 1000,
} = {}) => {
  const succeed = url => new Promise((resolve) => {
    log(url);
    setTimeout(() => resolve({ url }), delay);
  });

  const fail = url => new Promise((resolve, reject) => {
    log(url);
    setTimeout(() => reject(new Error('failed')), delay);
  });

  const uploadImage = willFail ? fail : succeed;
  if (printable) {
    Object.defineProperty(uploadImage, 'name', { value: uploadImage.toString() });
  }
  return uploadImage;
};

const url = 'https://unsplash.it/500/500';
const image = { preview: url };

const stories = storiesOf('Image', module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>);

const description = 'Control point to start from with knobs panel';
stories.add('presets', withInfo({
  text: description,
  inline: true,
})(() => {
  const startFrom = select('start-from', ['upload', 'cropping', 'preview'], 'upload');
  return (
    <div>
      <h2>{`Start from ${startFrom}`}</h2>
      <Image
        image={startFrom === 'cropping' ? image : undefined}
        url={startFrom === 'preview' ? url : undefined}
        uploadImage={createUploadImage({
          printable: true,
          willFail: boolean('will fail', false),
          delay: number('delay', 1000),
        })}
        selectActionLabel={text('selectActionLabel', 'Select')}
        changeActionLabel={text('changeActionLabel', 'New')}
        cropActionLabel={text('cropActionLabel', 'Edit')}
        resetActionLabel={text('resetActionLabel', 'Clear')}
        retryActionLabel={text('retryActionLabel', 'Retry')}
        uploadActionLabel={text('uploadActionLabel', 'Submit')}
      />
    </div>
  );
}));

stories.add('events', () => (
  <Image
    uploadImage={createUploadImage({
      willFail: boolean('will fail', true),
      log: dataURL => action('upload image size')(dataURL.length),
    })}
    onUploadSucceed={({ url: dataURL }) => action('upload succeed size')(dataURL.length)}
    onUploadFail={error => action('upload fail')(error.message)}
    onSetImage={file => action('select size')(file.size)}
  />
));

stories.add('initialState', () => (
  <Image
    uploadImage={createUploadImage()}
    initialState={object('initialState', {
      image,
      uploading: true,
    })}
  />
));

stories.add('ImagePreviewer', withInfo({
  inline: false,
})(() => {
  const src1 = text('src1', url);
  const src2 = text('src2', 'https://unsplash.it/600/600');
  const style = {
    width: number('width', 300),
    height: number('height', 300),
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <ImagePreviewer
        src={src1}
        style={style}
        initialOpen
      />
      <ImagePreviewer
        src={src2}
        style={style}
      />
    </div>
  );
}));
