import compose from 'recompose/compose';
import withReducer from 'recompose/withReducer';
import withHandlers from 'recompose/withHandlers';
import setDisplayName from 'recompose/setDisplayName';
import mapProps from 'recompose/mapProps';
import pure from 'recompose/pure';

const defaultState = {
  scale: 1,
  uploading: false,
  cropping: false,
  uploaded: false,
  failed: false,
};

const createInitialState = state => ({
  ...defaultState,
  ...state,
});

const reset = ({ setState }) => () => setState({ type: 'reset' });
const setSelector = ({ setState }) => selector => setState({ selector });
const setEditor = ({ setState }) => editor => setState({
  editor: editor && Object.assign(editor, {
    reset: () => {
      editor.state.image = {}; // eslint-disable-line no-param-reassign
    },
  }),
});
const openSelector = ({ state: { selector } }) => () => selector && selector.open();
const setImage = ({ setState }) => image => setState({ image });
const setScale = ({ setState }) => scale => setState({ scale });
const onUpload = ({
  setState,
  state: { editor },
  uploadImage,
}) => () => {
  if (!uploadImage) return;

  const canvas = editor.getImageScaledToCanvas();
  const finalState = { uploading: false };
  setState({ uploading: true, uploaded: false, failed: false });
  const onUploadSuccess = ({ url }) => setState({ url, uploaded: true, ...finalState });
  const onUploadFailed = () => setState({ failed: true, ...finalState });
  uploadImage(canvas).then(onUploadSuccess, onUploadFailed);
};

const handlers = { openSelector, setImage, setSelector, setEditor, setScale, onUpload, reset };

const mergeState = (state, { type, ...action } = {}) => {
  if (type === 'reset') {
    const { selector, editor } = state;
    if (selector && selector.reset) {
      selector.reset();
    }
    if (editor && editor.reset) {
      editor.reset();
    }
    return createInitialState({ ...action, selector, editor });
  }
  if (typeof action === 'object') {
    return { ...state, ...action };
  }
  return state;
};

const propsMapper = ({ state: { scale, image, uploading, uploaded, url, failed }, ...rest }) => ({
  ...rest,
  scale,
  uploading,
  uploaded,
  image,
  cropping: !!image && !uploaded,
  url,
  failed,
});

export default Component => compose(
  setDisplayName(Component.name),
  withReducer('state', 'setState', mergeState, ({ initialState }) => createInitialState(initialState)),
  withHandlers(handlers),
  mapProps(propsMapper),
  pure,
)(Component);
