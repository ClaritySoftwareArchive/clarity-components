import T from 'prop-types';
import compose from 'recompose/compose';
import withReducer from 'recompose/withReducer';
import mapProps from 'recompose/mapProps';
import pure from 'recompose/pure';
import flattenProp from 'recompose/flattenProp';

import omitProps from '../hocs/omitProps';
import omitPropTypes from '../hocs/omitPropTypes';
import extendStatics from '../hocs/extendStatics';
import copyStatics from '../hocs/copyStatics';
import embedHandlers from '../hocs/embedHandlers';

const defaultState = {
  scale: 1,
  uploading: false,
  failed: false,
  editor: undefined,
};

const createInitialState = ({ initialState, ...props }) => {
  const state = {
    ...defaultState,
    ...initialState,
  };

  Object.keys(defaultState).forEach((key) => {
    if (typeof props[key] !== 'undefined') {
      state[key] = props[key];
    }
  });

  return state;
};

const onUpload = ({
  editor,
  uploadImage,
  onUploadFail,
  onUploadStart,
  onUploadSucceed,
}) => () => {
  if (!uploadImage) return;

  const dataUrl = editor.getDataUrl();
  onUploadStart();
  uploadImage(dataUrl).then(onUploadSucceed, onUploadFail);
};

const reset = ({ setState, ...props }) => () => setState({ type: 'reset', props });
const setEditor = ({ setState }) => editor => setState({ editor });
const openEditor = ({ setState }) => () => setState({ uploaded: false });
const setImage = ({ setState }) => image => setState({ image });
const setScale = ({ setState }) => scale => setState({ scale });
const onUploadSucceed = ({ setState }) => ({ url }) =>
  setState({ url, uploaded: true, uploading: false });
const onUploadFail = ({ setState }) => () =>
  setState({ failed: true, uploading: false });
const onUploadStart = ({ setState }) => () =>
  setState({ uploading: true, uploaded: false, failed: false });

export const handlers = [{
  openEditor,
  setEditor,
  setImage,
  setScale,
  onUploadFail,
  onUploadStart,
  onUploadSucceed,
  reset,
}, {
  onUpload,
}];

const mergeState = (state, { type, props, ...action }) => {
  if (type === 'reset') {
    const { editor } = state;
    if (!props.image && editor && editor.reset) {
      editor.reset();
    }
    return createInitialState({ ...props, editor });
  }
  return { ...state, ...action };
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

export const propTypes = {
  initialState: T.shape({
    url: T.string,
  }),
  onUploadFail: T.func,
  onUploadStart: T.func,
  onUploadSucceed: T.func,
  uploadImage: T.func,
};

export const defaultProps = {
  initialState: defaultState,
};

export default Component => compose(
  omitPropTypes(['onUpload']),
  extendStatics({
    displayName: 'withImage',
    propTypes,
    defaultProps,
  }),
  copyStatics(Component),
  withReducer('state', 'setState', mergeState, createInitialState),
  flattenProp('state'),
  omitProps('initialState'),
  embedHandlers(handlers),
  omitProps(['editor', 'state', 'setState']),
  mapProps(propsMapper),
  pure,
)(Component);
