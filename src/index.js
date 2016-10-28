import isArray from '../libs/isArray';
import { isElement } from '../libs/isElement';
// import { once } from 'run-once';

const eventTypeStore = {};


const updateEventTypeStore = (newEvent, watchElements) => {
		const newEventLength = newEvent.length;

		for(let i = 0; i < newEventLength; i++){
			if(!eventTypeStore.hasOwnProperty(newEvent[i])){
				eventTypeStore[newEvent[i]] = watchElements;
				console.log('type of event', newEvent[i])
				window.addEventListener(newEvent[i], clickEventDelegator, true);
			}
		}
}


const clickEventDelegator = (e) => {
	const target = e.target;

	const clickWatchElements = eventTypeStore.click; 
	const clickWatchElementsLength = clickWatchElements.length;
	for(let i = 0; i < clickWatchElementsLength; i++){
		if(clickWatchElements[i] === target){
			console.log('fiyaaaaa')
		}
	}

	fireArguments.e = e;
	fireArguments.target = target;
	fireArguments.parent = target.parent;
	// console.info('window clicked')
}




const isHTMLCollection = (value) => {
	if (typeof value.item === 'function') {
		return value.item(0) === value[0];
	}
	return false;
}

const isString = (value) => {
	return typeof value === 'string';
}


const getElementReference = (value) => {
	let elements;

	if (isString(value)) {
		if (value.charAt(0) === '@') {
			// get hyperElement as array
		} else {
			elements = [document.querySelector(value)]; // query selector
		}
	} else if (isElement(value)) {
		elements = [value];
	} else if (isArray(value)) {
		elements = value;
	} else if (isHTMLCollection(value)) {
		elements = [].slice.call(value);
	}
	return elements;
}

// e, target, parent, interface, data
var fireArguments = {};



function fire(callback){
	// console.warn(callback);
	callback.call(this,fireArguments)
}



function yoga(elementReference, eventDescription, yogaCallback, interfaces) {
	// Get Array of elements.
	let elements = getElementReference(elementReference);
	let events;

	// Check if eventDescription is a yogaCallback or string.
	if (isString(eventDescription)) {
		events = eventDescription.split(':');
		updateEventTypeStore(events, elements);
	} else {
		// Pass hyperelment with addeventlistener (a wrapper to only use addeventlistener)
		return;
	}


	if (typeof yogaCallback === 'function') {
		// Pass delegated event info.
	}

	if (interfaces) {
		if (isArray(interfaces)) {
			// Pass delegated event info.
		} else if (isString(interfaces)) {

		}
		fireArguments.interface = interfaces;
	}

	// Push arguments to fireArguments for devs access.
	// fireArguments.e = 'this is e'//{target: {parentElement: null}};
	// fireArguments.target = 'this is target'//fireArguments.e.target;
	// fireArguments.parent = 'this is parent'//fireArguments.e.target.parentElement;
	// fireArguments.interface = 'this is interface'//null;
	fireArguments.data = 'this is data'//null;

	// Call fire as prop
	yogaCallback.call(this,fire)
	// console.info(elements, events, yogaCallback, interfaces)

}

// console.log('yooo')
window.yoga = yoga

export { yoga };
