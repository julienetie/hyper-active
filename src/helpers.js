export const isString = value => typeof value === 'string';
export const isPrimitive = value => isString(value) || typeof value === 'number';
export const isFunction = value => typeof value === 'function';
export const isElement = value => value instanceof window.Element;
export const getElement = selector => document.querySelector(selector);
export const type = (value, typeClass) => ({}).toString.call(value).includes(typeClass);
export const newError = message => {
    throw new Error(message);
};
let once = true;
const notice = (message, style) => {
    if (once) {
        // eslint-disable-next-line
        console.log(message, style);
        once = false;
    }
};
export const hasProperty = (obj, property) => !!Object.getOwnPropertyDescriptor(obj, property);
export const error = (value, parameter, linkHash) => {
    notice('%c :: yogafire ::', 'color: #999;');
    // throw new TypeError()
    throw new Error(
        `"${value}" is invalid, see ${parameter} \n🔗 https://github.com/julienetie/yogafire/wiki/API-🔥${linkHash}\n`
    );
};