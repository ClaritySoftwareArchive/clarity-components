/* eslint-env jest */
import _ from 'lodash';
import { refEditor, onScaleChange, onImageDrop } from '../ImageRenderer';

describe('refEditor(setEditor)(editor): { reset, getDataUrl }', () => {
  let editor;
  const setEditor = jest.fn((c) => {
    editor = c;
  });

  beforeEach(() => setEditor.mockClear());
  afterEach(() => expect(setEditor).toHaveBeenCalledTimes(1));

  test('reset changes editor.state.image to empty object', () => {
    const emptyImage = _.stubObject();
    const editorEntity = {
      state: {
        image: emptyImage,
      },
    };
    refEditor(setEditor)(editorEntity);
    editor.reset();
    expect(editorEntity.state.image).not.toBe(emptyImage);
    expect(editorEntity.state.image).toEqual(emptyImage);
  });

  test('getDataUrl calls editor.getImageScaledToCanvas().toDataURL()', () => {
    const url = _.stubObject();
    const toDataURL = jest.fn(() => url);
    const editorEntity = {
      getImageScaledToCanvas: () => ({ toDataURL }),
    };
    refEditor(setEditor)(editorEntity);

    const res = editor.getDataUrl();
    expect(res).toBe(url);
    expect(toDataURL).toHaveBeenCalledTimes(1);
  });
});

describe('onScaleChange(setScale)(event, scale){...}', () => {
  const setScale = jest.fn();
  const event = {
    stopPropagation: jest.fn(),
  };
  const scale = _.stubObject();
  onScaleChange(setScale)(event, scale);
  test('event.stopPropagation gets called', () => {
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  test('setScale gets called with scale', () => {
    expect(setScale).toHaveBeenCalledTimes(1);
    expect(setScale).toHaveBeenCalledWith(scale);
  });
});

describe('onImageDrop(setImage)([imgFile]){...}', () => {
  const setImage = jest.fn();
  const imgFile = _.stubObject();
  beforeEach(() => setImage.mockClear());

  test('setImage gets called with imgFile', () => {
    onImageDrop(setImage)([imgFile]);
    expect(setImage).toHaveBeenCalledTimes(1);
    expect(setImage).toHaveBeenCalledWith(imgFile);
  });

  test('does nothing if imgFile is undefined', () => {
    onImageDrop(setImage)([]);
    expect(setImage).toHaveBeenCalledTimes(0);
  });
});
