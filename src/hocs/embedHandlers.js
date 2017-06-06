import mapValues from 'lodash.mapvalues';
import withHandlers from './withHandlers';
import { createEmbeddedHandler } from './embedHandler';

const createEmbeddedHandlers = handlers => mapValues(handlers, createEmbeddedHandler);

export default (handlers) => {
  const handlersArray = Array.isArray(handlers) ? handlers : [handlers];
  return withHandlers(handlersArray.map(createEmbeddedHandlers));
};
