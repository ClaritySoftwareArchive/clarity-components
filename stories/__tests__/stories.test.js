/* eslint-env jest */
import initStoryshots from '@storybook/addon-storyshots';

jest.mock('material-ui/LinearProgress');
jest.mock('react-avatar-editor');
jest.mock('react-image-lightbox');

initStoryshots();
