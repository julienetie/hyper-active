const createHandler = (products) => {

    mousedownHandler = e => {
        const target = e.target;
        products.map(product => {
            const { suspects, relation, handlers, delay, tail, callType } = product;
            switch (relation) {
                case 'is':
                    const is = suspects.find(element => target === element);
                    if (is) {
                        suspects.find((suspect, i) => {
                            if (suspect === target) {
                                handlers[i]({ e, target, suspect, i });
                                return true;
                            }
                            return false;
                        });
                        return;
                    }
                    break;
                case 'closest':
                case 'contains':
                    const isClosest = relation === 'closest';
                    const resolvedRelation = suspects
                        .find(element => {
                            if (isClosest) {
                                // console.log('closest')
                                return element.contains(target) ? element : null;
                            } else {
                                // console.log('contains')
                                return target.contains(element) ? element : null;
                            }
                        });
                    if (resolvedRelation) {
                        switch (callType) {
                            case 'fire':
                                suspects.find((suspect, i) => {
                                    if (suspect === resolvedRelation) {
                                        handlers[i]({ e, target, suspect, i });
                                        return true;
                                    }
                                    return false;
                                });
                                return;
                            case 'fireAll':
                                suspects.forEach((suspect, i) =>
                                    handlers[i]({ e, target, suspect, i })
                                );
                                return;
                        }
                    }
                    break;
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



const firePartial = (callType, eventType, relation, suspectsType, suspects, sequence, delay, tail) => {
    return (...handlers) => {
        sequence += ` ${callType}`;
        const createNewEventListener = events[eventType] === undefined;
        if (createNewEventListener) {
            events[eventType] = [];
            document.addEventListener(eventType, mousedownHandlerWrapper, false);
        }

        const limiter = sequence.includes('debounce') ?
            limiters['debounce'] : sequence.includes('throttle') ?
            limiters['throttle'] : limiters['direct'];

        events[eventType].push({
            relation,
            suspects,
            callType,
            handlers: handlers.map(handler => limiter(handler, delay, tail)),
            ref: null,
            killType: null
        });

        const products = events[eventType];
        createHandler(products);
    };
}



const debouncePartial = (eventType, relation, suspectsType, suspects, sequence) => {
    return (delay, tail) => {
        sequence += 'debounce';
        return {
            fire: firePartial('fire', eventType, relation, suspectsType, suspects, sequence, delay, tail),
            fireAll: firePartial('fireAll', eventType, relation, suspectsType, suspects, sequence, delay, tail)
        }
    }
}


const throttlePartial = (eventType, relation, suspectsType, suspects, sequence) => {
    return (delay, tail) => {
        sequence += 'throttle';
        return {
            fire: firePartial('fire', eventType, relation, suspectsType, suspects, sequence, delay, tail),
            fireAll: firePartial('fireAll', eventType, relation, suspectsType, suspects, sequence, delay, tail)
        }
    }
}




const event = eventType => {
    let sequence = '';
    sequence += eventType;
    const props = () => {
        return `@TBA Details about the events in use
				- number of registered events of this type 
				- muber of killed events of this type
				- number of active events of this type
				- number of suspende events of this type`
    };
    const relation = relationType => {
        return (...suspects) => {
            sequence += ` ${relationType}`;
            // Suspects as parameters.
            const isNamedElements = suspects.length === 1 && Object.keys(suspects[0])[0] instanceof Element;
            const suspectsType = isNamedElements ? 'object' : 'params';
            return {
                fire: firePartial('fire', eventType, relationType, suspectsType, suspects, sequence),
                fireAll: firePartial('fireAll', eventType, relationType, suspectsType, suspects, sequence),
                debounce: debouncePartial(eventType, relationType, suspectsType, suspects, sequence),
                throttle: throttlePartial(eventType, relationType, suspectsType, suspects, sequence),
            };
        }
    }
    props.closest = relation('closest');
    props.contains = relation('contains');
    props.is = relation('is');
    return props;
}






export const mousedown = event('mousedown');
export const mousemove = event('mousemove');
export const click = event('click');