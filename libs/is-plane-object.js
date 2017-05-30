const isObject = value => value != null && typeof value === 'object' && Array.isArray(value) === false;
const isObjectObject = value => isObject(value) === true && Object.prototype.toString.call(value) === '[object Object]';

// Is plane object.
export default value => {
    const valueConstructor = value.constructor;
    const constructorPrototype = valueConstructor.prototype;

    if (isObjectObject(value) === false) {
        return false;
    }

    if (typeof valueConstructor !== 'function') {
        return false;
    }

    if (isObjectObject(constructorPrototype) === false) {
        return false;
    }
    // eslint-disable-next-line 
    if ((constructorPrototype).hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }
    return true;
};
