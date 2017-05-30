const isHTMLCollection = (value) => {
	if (typeof value.item === 'function') {
		return value.item(0) === value[0];
	}
	return false;
}

const isString = (value) => typeof value === 'string';

const isFunction = (value) => typeof value === 'function';

const hasDuplicates = (array) => (new Set(array)).size !== array.length;

export { 
	isHTMLCollection,
	isFunction,
	isString,
	hasDuplicates 
}
