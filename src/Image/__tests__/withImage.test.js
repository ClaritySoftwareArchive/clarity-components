/* eslint-env jest */
import _ from 'lodash';
import { defaultState, handlers, createInitialState } from '../withImage';

const [{
  openEditor,
  onUploadFail,
  onUploadStart,
  onUploadSucceed,
  reset,
}, {
  onUpload,
}] = handlers;

test('openEditor({ setState, ...props }):handler', () => {
  const setState = jest.fn();
  openEditor({ setState })();
  expect(setState).toHaveBeenCalled();
  expect(setState).toHaveBeenCalledWith({ uploaded: false });
});

describe('createInitialState({ initialState, ...props }): handler', () => {
  test('with empty initialState', () => {
    const res = createInitialState({ initialState: {} });
    expect(res).toEqual(defaultState);
  });

  test('when scale is initialized in initialState', () => {
    const res = createInitialState({
      initialState: {
        scale: 2,
      },
    });
    expect(res).toEqual({
      ...defaultState,
      scale: 2,
    });
  });

  test('when scale is controlled in props', () => {
    const res = createInitialState({
      initialState: {
        scale: 2,
      },
      scale: 3,
    });
    expect(res).toEqual({
      ...defaultState,
      scale: 3,
    });
  });
});

describe('reset({ resetState, ...props }):handler', () => {
  let props;
  let res;
  const resetState = (fn) => {
    res = fn(props);
    return res;
  };
  const createNewState = jest.fn();

  beforeEach(() => {
    props = { foo: 1, bar: 2 };
    res = null;
    createNewState.mockClear();
  });

  test('when editor is set', () => {
    const editor = { reset: jest.fn() };
    props.editor = editor;
    reset({ resetState, ...props })();
    expect(res).toEqual({
      ...defaultState,
      editor,
    });
    expect(editor.reset).toHaveBeenCalled();
  });

  test('when image is controlled in props', () => {
    const editor = { reset: jest.fn() };
    props.editor = editor;
    props.image = _.stubObject();
    reset({ resetState, ...props })();
    expect(res).toEqual({
      ...defaultState,
      editor,
    });
    expect(editor.reset).not.toHaveBeenCalled();
  });
});

test('onUploadStart({ setState }):handler', () => {
  const setState = jest.fn();
  onUploadStart({ setState })();
  expect(setState).toHaveBeenCalled();
  expect(setState).toHaveBeenCalledWith({
    uploaded: false,
    uploading: true,
    failed: false,
  });
});

test('onUploadSucceed({ setState }):handler', () => {
  const setState = jest.fn();
  const url = 'http://url.com';
  onUploadSucceed({ setState })({ url });
  expect(setState).toHaveBeenCalled();
  expect(setState).toHaveBeenCalledWith({
    url,
    uploaded: true,
    uploading: false,
  });
});

test('onUploadFail({ setState }):handler', () => {
  const setState = jest.fn();
  onUploadFail({ setState })();
  expect(setState).toHaveBeenCalled();
  expect(setState).toHaveBeenCalledWith({
    uploading: false,
    failed: true,
  });
});

describe('onUpload({ uploadImage }):handler', () => {
  const dataUrl = _.stubString();
  let props;
  beforeEach(() => {
    props = {
      editor: {
        getDataUrl: jest.fn(() => dataUrl),
      },
      onUploadStart: jest.fn(),
      onUploadSucceed: jest.fn(),
      onUploadFail: jest.fn(),
    };
  });

  test('when uploadImage will resolve', async () => {
    const imageUploaded = _.stubObject();
    const uploadImage = jest.fn(() => new Promise(resolve => resolve(imageUploaded)));
    await onUpload({
      ...props,
      uploadImage,
    })();
    expect(props.editor.getDataUrl).toHaveBeenCalled();
    expect(props.onUploadStart).toHaveBeenCalled();
    expect(props.onUploadSucceed).toHaveBeenCalled();
    expect(props.onUploadFail).not.toHaveBeenCalled();
  });

  test('when uploadImage will reject', async () => {
    const uploadImage = jest.fn(() => new Promise((resolve, reject) => reject()));
    await onUpload({
      ...props,
      uploadImage,
    })();
    expect(props.editor.getDataUrl).toHaveBeenCalled();
    expect(props.onUploadStart).toHaveBeenCalled();
    expect(props.onUploadSucceed).not.toHaveBeenCalled();
    expect(props.onUploadFail).toHaveBeenCalled();
  });

  test('when no uploadImage', async () => {
    await onUpload(props)();
    expect(props.editor.getDataUrl).not.toHaveBeenCalled();
    expect(props.onUploadStart).not.toHaveBeenCalled();
    expect(props.onUploadSucceed).not.toHaveBeenCalled();
    expect(props.onUploadFail).not.toHaveBeenCalled();
  });
});
