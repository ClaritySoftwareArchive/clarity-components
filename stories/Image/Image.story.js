import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, select, number, text } from '@storybook/addon-knobs';
import { MuiThemeProvider } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Image, ImagePreviewer } from '../../src';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const createUploadImage = ({
  log = action('upload image'),
  printable,
} = {}) => {
  const uploadImage = dataUrl => new Promise((resolve, reject) => {
    log(dataUrl);
    const upload = () => (Math.random() < 0.5
      ? resolve({ url: dataUrl })
      : reject(new Error('failed')));
    setTimeout(upload, 1000);
  });
  if (printable) {
    Object.defineProperty(uploadImage, 'name', { value: uploadImage.toString() });
  }
  return uploadImage;
};

const url = 'https://unsplash.it/200/100';
const image = { preview: url };

const stories = storiesOf('Image', module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>);

const description = 'Control point to start from with knobs panel';
stories.addWithInfo('Controlled', description, () => {
  const startFrom = select('start-from', ['upload', 'cropping', 'preview'], 'upload');
  return (
    <div>
      <h2>Start from {startFrom}</h2>
      <Image
        image={startFrom === 'cropping' ? image : undefined}
        url={startFrom === 'preview' ? url : undefined}
        uploadImage={createUploadImage({ printable: true })}
      />
    </div>
  );
}, { inline: true });

stories.add('with initialState', () => (
  <Image
    uploadImage={createUploadImage()}
    initialState={object('initialState', {
      image,
      uploading: true,
    })}
  />
));

stories.addWithInfo('ImagePreviewer', '', () => {
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
}, { inline: false });
