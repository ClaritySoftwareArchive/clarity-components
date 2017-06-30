/* eslint-env jest */
import _ from 'lodash';
import { handlers } from '../ImageCropper';

const {
  refEditor,
  onScaleChange,
  onRotateLeft,
  onRotateRight,
} = handlers;

describe('refEditor({ setEditor })(editor): { reset, getDataUrl }', () => {
  let editor;
  const resetState = jest.fn();
  const setEditor = jest.fn((c) => {
    editor = c;
  });

  const refEditorHandler = refEditor({ setEditor, resetState });
  beforeEach(() => {
    setEditor.mockClear();
    resetState.mockClear();
  });
  afterEach(() => {
    expect(setEditor).toHaveBeenCalledTimes(1);
  });

  test('reset changes editor.state.image to empty object', () => {
    const emptyImage = _.stubObject();
    const editorEntity = {
      state: {
        image: emptyImage,
      },
    };
    refEditorHandler(editorEntity);
    editor.reset();
    expect(editorEntity.state.image).not.toBe(emptyImage);
    expect(editorEntity.state.image).toEqual(emptyImage);
    expect(resetState).toHaveBeenCalledTimes(1);
  });

  describe('getDataUrl(scaleToCanvas, type, quality)', () => {
    const toDataURL = jest.fn();
    const editorInstance = {
      getImage: jest.fn(() => ({ toDataURL })),
      getImageScaledToCanvas: jest.fn(() => ({ toDataURL })),
    };

    beforeEach(() => {
      toDataURL.mockClear();
      refEditorHandler(editorInstance);
    });

    test('call with default params', () => {
      editor.getDataUrl();
      expect(editorInstance.getImage).toHaveBeenCalledTimes(1);
      expect(toDataURL).toHaveBeenCalledTimes(1);
      expect(toDataURL).toHaveBeenCalledWith('image/jpeg', 0.92);
    });

    test('call with all params', () => {
      editor.getDataUrl(true, 'image/png', 0.5);
      expect(editorInstance.getImageScaledToCanvas).toHaveBeenCalledTimes(1);
      expect(toDataURL).toHaveBeenCalledTimes(1);
      expect(toDataURL).toHaveBeenCalledWith('image/png', 0.5);
    });
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

describe('onRotateLeft({ setRotate, rotate })(event){...}', () => {
  const setRotate = jest.fn();
  const rotate = 0;
  const event = {
    stopPropagation: jest.fn(),
  };
  onRotateLeft({ setRotate, rotate })(event);
  test('event.stopPropagation gets called', () => {
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  test('setRotate, rotate gets called with scale', () => {
    expect(setRotate).toHaveBeenCalledTimes(1);
    expect(setRotate).toHaveBeenCalledWith(-90);
  });
});

describe('onRotateRight({ setRotate, rotate })(event){...}', () => {
  const setRotate = jest.fn();
  const rotate = 0;
  const event = {
    stopPropagation: jest.fn(),
  };
  onRotateRight({ setRotate, rotate })(event);
  test('event.stopPropagation gets called', () => {
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  test('setRotate, rotate gets called with scale', () => {
    expect(setRotate).toHaveBeenCalledTimes(1);
    expect(setRotate).toHaveBeenCalledWith(90);
  });
});
