const isHTMLCollection = (value) => {
	if (typeof value.item === 'function') {
		return value.item(0) === value[0];
	}
	return false;
}

const isString = (value) => {
	return typeof value === 'string';
}

const isFunction = (value) => {
	return typeof value === 'function';
}


export { 
	isHTMLCollection,
	isFunction,
	isString 
}
