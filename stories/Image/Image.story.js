import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MuiThemeProvider } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import defaultImage from './kitty.jpg';
import Image from '../../src/Image';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const uploadImage = canvas => new Promise((resolve, reject) => {
  action('upload image')(canvas.toDataURL());
  const upload = () => (Math.random() < 0.5
    ? resolve({ url: canvas.toDataURL() })
    : reject(new Error('failed')));
  setTimeout(upload, 1000);
});

const image = { preview: defaultImage };
const url = defaultImage;

storiesOf('Image', module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>)
  .add('default', () => (
    <Image uploadImage={uploadImage} />
  ))
  .add('with image', () => (
    <Image
      uploadImage={uploadImage}
      initialState={{ image }}
    />
  ))
  .add('uploading', () => (
    <Image
      uploadImage={uploadImage}
      initialState={{ image, uploading: true }}
    />
  ))
  .add('uploaded', () => (
    <Image
      uploadImage={uploadImage}
      initialState={{ image, uploaded: true, url }}
    />
  ))
  .add('failed', () => (
    <Image
      uploadImage={uploadImage}
      initialState={{ image, failed: true }}
    />
  ));
