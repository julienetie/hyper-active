/** 
 * The sequence of public chained methods.
 * This allows yogafire to determine the outcome.
 * A sequence must be emptied once fulfilled. 
 */
const sequence = [];
const delegateReferences = {};

const createHandler = (products) => {
    mousedownHandler = e => {
        const target = e.target;
        products.map(reference => {
            const { relation, handlers, suspects, delay, tail, exclusions, exclusionType } = delegateReferences[reference];

            switch (exclusionType) {
                // Ignore if target is contained in an element on the exclusion list
                case 'not-closest':
                    if (exclusions.some(exclusion => exclusion.contains(target))) {
                        return;
                    }
                    break;
                    // Ignore if an element on the exclusion list is contained within the target 
                case 'not-contains':
                    if (exclusions.some(exclusion => target.contains(exclusion))) {
                        return;
                    }
                    break;
            }

            switch (relation) {
                case 'equals':
                    // Ignore if target is on the exclusion list
                    if (exclusions && exclusions.includes(target)) {
                        return;
                    }

                    const equals = suspects.find(element => target === element);
                    if (equals) {
                        suspects.find((suspect, i) => {
                            if (suspect === target) {
                                const index = handlers.length === 1 ? 0 : i;
                                handlers[index]({ e, target, suspect, i });
                                return true;
                            }
                            return false;
                        });
                        return;
                    }
                    break;
                case 'closest':
                    {
                        const match = suspects
                            .find(element => {
                                return element.contains(target) && target !== element ? element : null;
                            });
                        if (match) {
                            suspects.find((suspect, i) => {
                                if (suspect === match) {
                                    const index = handlers.length === 1 ? 0 : i;
                                    handlers[index]({ e, target, suspect, i });
                                    return true;
                                }
                            });
                        }
                    }
                    break;
                case 'contains':
                    const matches = suspects
                        .reduce((acc, element, i) => {
                            if (target.contains(element) && target !== element) {
                                const index = handlers.length === 1 ? 0 : i;
                                const item = {
                                    suspect: element,
                                    handler: handlers[index],
                                    i
                                }
                                acc.push(item);
                            }
                            return acc;
                        }, []);

                    if (matches.length > 0) {
                        matches.forEach(({ handler, element, i }) => {
                            handler({ e, target, suspect: e, i });
                        });
                    }
            }

        });
    }
}


const uniqueKeyRegistry = [];
const events = {};
const suspectHandlerStore = [];

let mousedownHandler = () => {};
const mousedownHandlerWrapper = e => {
    mousedownHandler(e);
}


function throttle(callback, limit) {
    let lastCallTime;
    return function(parameters) {
        const currentCallTime = Date.now();
        if (!lastCallTime || currentCallTime > lastCallTime + limit) {
            callback(parameters);
            lastCallTime = currentCallTime;
        }
    };
}

const debounce = (callback, delay, lead) => {
    var debounceRange = 0;
    var currentTime;
    var lastCall;
    var setDelay;
    var timeoutId;

    const call = parameters => {
        callback(parameters);
    };

    return parameters => {
        if (lead) {
            currentTime = Date.now();
            if (currentTime > debounceRange) {
                callback(parameters);
            }
            debounceRange = currentTime + delay;
        } else {
            /**
             * setTimeout is only used with the trail option.
             */
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                call(parameters);
            }, delay);
        }
    };
}

const direct = (callback) => {
    return parameters => {
        callback(parameters);
    }
}


const limiters = {
    direct,
    debounce,
    throttle,
}


const addEventListenerRegister = {};

const getExlcusionType = (sequence) => {
    switch (true) {
        case sequence.includes('not-closest'):
            return 'not-closest';
        case sequence.includes('not-contains'):
            return 'not-contains';
        case sequence.includes('not-equals'):
            return 'not-equals';
    }
    return null;
}


// const firePartial = (eventType, relation, suspectsType, suspects, delay, tail) => {
const firePartial = reference => {
    return (...handlers) => {
        sequence.push('fire');
        const delegate = delegateReferences[reference];
        const { eventType, relation, delay, tail } = delegate;

        /** 
         * If eventListener of the eventType does not exist create a new one.
         */
        const createNewEventListener = events[eventType] === undefined;
        if (createNewEventListener) {
            events[eventType] = [];
            const useCapture = false;
            addEventListenerRegister[eventType] = {
                handler: mousedownHandlerWrapper,
                useCapture
            }
            document.addEventListener(eventType, mousedownHandlerWrapper, useCapture);
        }

        const limiter = sequence.includes('debounce') ?
            limiters['debounce'] : sequence.includes('throttle') ?
            limiters['throttle'] : limiters['direct'];

        const exclusionType = getExlcusionType(sequence);

        /** 
         * Empty the sequence as this is the end of the road.
         */
        sequence.length = 0;

        delegateReferences[reference].handlers = handlers.map(handler => limiter(handler, delay, tail))
        delegateReferences[reference].exclusionType = exclusionType;
        events[eventType].push(reference);
        const products = events[eventType];
        createHandler(products);
        return reference;
    };
}

const notClosestPartial = (reference) => {
    return (...exclusions) => {
        sequence.push('not-closest');
        delegateReferences[reference].exclusions = exclusions;
        return {
            fire: firePartial(reference)
        }
    }
}

const notContainsPartial = (reference) => {
    return (...exclusions) => {
        sequence.push('not-contains');
        delegateReferences[reference].exclusions = exclusions;
        return {
            fire: firePartial(reference)
        }
    }
}

const debouncePartial = (eventType, relation, suspectsType, suspects) => {
    return (delay, tail) => {
        sequence.push('debounce');
        return {
            fire: firePartial('fire', eventType, relation, suspectsType, suspects, delay, tail),
            fireAll: firePartial('fireAll', eventType, relation, suspectsType, suspects, delay, tail)
        }
    }
}


const throttlePartial = (eventType, relation, suspectsType, suspects) => {
    return (delay, tail) => {
        sequence.push('throttle');
        return {
            fire: firePartial('fire', eventType, relation, suspectsType, suspects, delay, tail),
            fireAll: firePartial('fireAll', eventType, relation, suspectsType, suspects, delay, tail)
        }
    }
}



const event = eventType => {
    const props = () => {
        return `@TBA Details about the events in use
				- number of registered events of this type 
				- muber of killed events of this type
				- number of active events of this type
				- number of suspende events of this type`
    };
    const relation = (type, isNot) => {

        return (...suspects) => {

            sequence.push('event');
            if (isNot === 'not') {
                sequence.push('not');
            }
            sequence.push(type);
            // Suspects as parameters.
            const isNamedElements = suspects.length === 1 && Object.keys(suspects[0])[0] instanceof Element;


            // Create Reference
            const reference = Symbol();

            delegateReferences[reference] = {
                suspects,
                relation: type,
                eventType
            }
            return {
                not: {
                    closest: notClosestPartial(reference),
                    contains: notContainsPartial(reference),
                },
                fire: firePartial(reference),
                debounce: debouncePartial(reference),
                throttle: throttlePartial(reference),
            };
        }
    }

    props.closest = relation('closest');
    props.contains = relation('contains');
    props.equals = relation('equals');
    props.remove = () => {
        const { handler, useCapture } = addEventListenerRegister[eventType];
        delete events[eventType];
        document.removeEventListener(eventType, handler, useCapture);
    }
    return props;
}

export const click = event('click');
export const input = event('input');
export const keyup = event('keyup');
export const keydown = event('keydown');
export const mousedown = event('mousedown');
export const mousemove = event('mousemove');
