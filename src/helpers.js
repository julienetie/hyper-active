export const isString = value => typeof value === 'string';
export const isPrimitive = value => isString(value) || typeof value === 'number';
export const isFunction = value => typeof value === 'function';
export const isElement = value => value instanceof window.Element;
export const getElement = selector => document.querySelector(selector);
export const newError = message => { throw new Error(message); };
