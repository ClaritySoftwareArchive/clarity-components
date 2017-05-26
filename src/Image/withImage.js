import compose from 'recompose/compose';
import withReducer from 'recompose/withReducer';
import withHandlers from 'recompose/withHandlers';
import setDisplayName from 'recompose/setDisplayName';
import mapProps from 'recompose/mapProps';
import pure from 'recompose/pure';
import flattenProp from 'recompose/flattenProp';
import omit from 'lodash.omit';

const omitProps = keys => mapProps(props => omit(props, keys));

const defaultState = {
  scale: 1,
  uploading: false,
  failed: false,
};

const createInitialState = state => ({
  ...defaultState,
  ...state,
});

const reset = ({ setState, ...props }) => () => setState({ type: 'reset', props });
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

const mergeState = (state, { type, props, ...action } = {}) => {
  if (type === 'reset') {
    const { selector, editor } = state;
    if (!props.image && selector && selector.reset) {
      selector.reset();
    }
    if (!props.image && editor && editor.reset) {
      editor.reset();
    }
    return createInitialState({ ...action, selector, editor });
  }
  if (typeof action === 'object') {
    return { ...state, ...action };
  }
  return state;
};

const propsMapper = ({
  url,
  uploaded = !!url,
  image = (url ? { preview: url } : undefined),
  ...rest
}) => ({
  ...rest,
  url,
  uploaded,
  image,
  cropping: !!image && !uploaded,
});

export default Component => compose(
  setDisplayName(Component.name),
  withReducer('state', 'setState', mergeState, ({ initialState }) => createInitialState(initialState)),
  withHandlers(handlers),
  flattenProp('state'),
  omitProps(['selector', 'editor']),
  mapProps(propsMapper),
  pure,
)(Component);
