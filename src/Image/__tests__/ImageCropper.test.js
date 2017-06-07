/* eslint-env jest */
import _ from 'lodash';
import { refEditor, onScaleChange } from '../ImageCropper';

describe('refEditor({ setEditor })(editor): { reset, getDataUrl }', () => {
  let editor;
  const setEditor = jest.fn((c) => {
    editor = c;
  });

  const handler = refEditor({ setEditor });
  beforeEach(() => setEditor.mockClear());
  afterEach(() => expect(setEditor).toHaveBeenCalledTimes(1));

  test('reset changes editor.state.image to empty object', () => {
    const emptyImage = _.stubObject();
    const editorEntity = {
      state: {
        image: emptyImage,
      },
    };
    handler(editorEntity);
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
    handler(editorEntity);

    const res = editor.getDataUrl();
    expect(res).toBe(url);
    expect(toDataURL).toHaveBeenCalledTimes(1);
  });
});

describe('onScaleChange({ setScale })(event, scale){...}', () => {
  const setScale = jest.fn();
  const event = {
    stopPropagation: jest.fn(),
  };
  const scale = _.stubObject();
  onScaleChange({ setScale })(event, scale);
  test('event.stopPropagation gets called', () => {
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  test('setScale gets called with scale', () => {
    expect(setScale).toHaveBeenCalledTimes(1);
    expect(setScale).toHaveBeenCalledWith(scale);
  });
});
