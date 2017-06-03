import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

import options from './options';

// addon-options
setAddon(infoAddon);
setOptions(options);

// addon-knobs
// Add the `withKnobs` decorator to add knobs support to your stories.
addDecorator(withKnobs);

// load stories
function loadStories() {
  const req = require.context('../stories', true, /\.story\.js$/);

  require('../stories/Welcome.js');

  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
