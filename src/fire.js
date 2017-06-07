import isPlaneObject from '../libs/is-plane-object';
import addEventListeners from './add-event-listeners';
import { isString, isElement, isFunction, error } from './helpers';
import singleEvents from './single-events';


/**
 * Enclosing function.
 *
 * @returns {Function} List of event details.
 */
const fireEnclosing = () => {
    const handlerLinkingList = [];
    const handlerList = [];
    const eventSetNameList = [];
    const suspectsList = [];

    /**
     * The fire API.
     *
     * @param {Object|string|Element| Array} fireConfig - The event delegation
     * config or first parameter for singleEvents.
     * @param {Array} singleParams - Event type, handler and use capture
     * parameters for singleEvents.
     */
    return function fire(fireConfig, ...singleParams) {
        // Ensure fireConfig is defined.
        if (fireConfig === undefined) {
            error(fireConfig, 'fireConfig', '*#fireConfig');
        }


        // Check if usage requires fireConfig or singleEvent API.
        if (!isPlaneObject(fireConfig)) {
            return singleEvents(fireConfig, ...singleParams);
        }

        // Process each eventSet.
        const eventsObjectKeys = Object.keys(fireConfig);
        const eventListeners2d = eventsObjectKeys.map(eventSetName => {
            const { suspect, suspects, handler } = fireConfig[eventSetName];
            // Treats suspects and suspect synonomously.
            const suspectsSynonomous = suspects || suspect;
            let resolvedHandler;


            const isSuspectsValid = [
                isElement(suspectsSynonomous),
                isString(suspectsSynonomous),
                Array.isArray(suspectsSynonomous)
            ].some(typeCheckValue => typeCheckValue);

            if (!isSuspectsValid) {
                error(suspectsSynonomous, 'suspect|suspects', '*#suspect');
            }

            if (isFunction(handler)) {
                // Add eventSetNames as pre-existing properties for linkage.
                handlerLinkingList.push(eventSetName);
                handlerList.push(handler);
                resolvedHandler = handler;
            } else if (isString(handler)) {
                // Checks for handleLink.
                const handlerLinkIndex = handlerLinkingList.indexOf(handler);
                resolvedHandler = handlerList[handlerLinkIndex];
            } else {
                error(suspectsSynonomous, 'handler', '*#handler');
            }

            eventSetNameList.push(eventSetName);
            suspectsList.push(suspectsSynonomous);

            const isSuspectsLinkIndex = eventSetNameList.indexOf(suspectsSynonomous);

            // Checks for suspectsLink.
            const resolvedSuspects = isSuspectsLinkIndex >= 0 ? suspectsList[
                isSuspectsLinkIndex
            ] : suspectsSynonomous;

            return eventSetName.split(':')
                .map(eventType => {
                    const wrappedSuspects = isString(resolvedSuspects) ? [
                        resolvedSuspects
                    ] : resolvedSuspects;
                    return {
                        eventType,
                        suspects: wrappedSuspects,
                        handler: resolvedHandler,
                        eventSetName
                    };
                });
        });

        // Flattern event listeners.
        const eventListeners = eventListeners2d.reduce((a, b) => a.concat(b), []);

        // Set up event listeners for delegation.
        return addEventListeners(eventListeners);
    };
};

export default fireEnclosing();
