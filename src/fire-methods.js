function relate() {
	console.info('relate function', this);
}

function destruct() {
	console.info('destruct function', this);
}

export { relate, destruct };