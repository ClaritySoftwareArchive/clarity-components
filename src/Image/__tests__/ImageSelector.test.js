/* eslint-env jest */
import { onImageSelect } from '../ImageSelector';

describe('onImageSelect({ setImage })([imgFile]){...}', () => {
  const setImage = jest.fn();
  const imgFile = { type: 'image/jpg' };
  const txtFile = { type: 'text/plain' };
  const handler = onImageSelect({ setImage });
  beforeEach(() => setImage.mockClear());

  test('setImage gets called if event has only a img file', () => {
    const event = { target: { files: [imgFile] } };
    handler(event);
    expect(setImage).toHaveBeenCalledTimes(1);
    expect(setImage).toHaveBeenCalledWith(imgFile);
  });

  test('setImage gets called if event has both txt and img files', () => {
    const event = { target: { files: [txtFile, imgFile] } };
    handler(event);
    expect(setImage).toHaveBeenCalledTimes(1);
    expect(setImage).toHaveBeenCalledWith(imgFile);
  });

  test('setImage gets called with first img if event has multiple img files', () => {
    const pngFile = { type: 'image/png' };
    const event = { target: { files: [pngFile, imgFile] } };
    handler(event);
    expect(setImage).toHaveBeenCalledTimes(1);
    expect(setImage).toHaveBeenCalledWith(pngFile);
  });

  test('does nothing if event has only a txt file', () => {
    const event = { target: { files: [txtFile] } };
    handler(event);
    expect(setImage).toHaveBeenCalledTimes(0);
  });

  test('does nothing if event is blank', () => {
    const event = { target: { files: [] } };
    handler(event);
    expect(setImage).toHaveBeenCalledTimes(0);
  });
});
