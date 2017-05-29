const logError = ({ message, type, value}) => {
	const error = new Error();

	/**
	 * Logs YogaFire in the console.
	 */
	if(typeof process === 'undefined'){
		console.info("%cYogaFire", "color: #cc0000; font-size:1rem;"); 		
	}

	error.message = message;
	error.type = type;
	error.value = value;
	throw error;
}

export default logError;