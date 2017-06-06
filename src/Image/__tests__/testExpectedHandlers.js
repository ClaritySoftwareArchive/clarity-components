/* eslint-env jest */
import _ from 'lodash';

export default (handlerMap, outputHandlers, inputHandlers) => {
  const testOutputHandler = (inputNames, outputName) =>
    describe(`output handler ${outputName}`, () => {
      const outputHandler = outputHandlers[outputName];
      const expectedHandlers = _.pick(inputHandlers, inputNames);

      it('should be a function', () => expect(typeof outputHandler).toBe('function'));

      const clearInputHandler = inputHandler => inputHandler.mockClear();

      const testInputHandler = (inputHandler, inputName) => {
        it(`should call input handler ${inputName}`, () => {
          expect(inputHandler).toHaveBeenCalledTimes(1);
        });
      };

      _.forEach(expectedHandlers, clearInputHandler);
      outputHandler();
      _.forEach(expectedHandlers, testInputHandler);
    });

  _.forEach(handlerMap, testOutputHandler);
};
