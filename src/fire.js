import isPlaneObject from '../libs/is-plane-object';
import addEventListeners from './add-event-listeners';
import { isString, isElement, error } from './helpers';
import singleEvents from './single-events';

/**
 * Enclosing function.
 *
 * @return {Function} fireEnclosing  - Contains lists.
 */
const fireEnclosing = () => {
    const handlerLinkingList = [];
    const handlerList = [];
    const eventSetNameList = [];
    const suspectsList = [];

    /** 
     * The fire API.
     *
     * @param {Object|string}
     * @param {string}
     * @param {Function}
     * @param {Boolean| Object}
     */
    return function fire(
        fireConfig,
        ...singleParams
    ) {
        // Check if usage requires fireConfig or singleEvent API.
        if (!isPlaneObject(fireConfig)) {
            return singleEvents(fireConfig, ...singleParams);
        }

        // Process each eventSet.
        const eventsObjectKeys = Object.keys(fireConfig);
        const eventListeners2d = eventsObjectKeys
            .map((eventSetName, i) => {
                const { suspect, suspects, handler } = fireConfig[
                    eventSetName
                ];

                // Treats suspects and suspect synonomously.
                const suspectsSynonomous = suspects || suspect;
                let resolvedHandler;


                const isSuspectsValid = [
                    isElement(suspectsSynonomous),
                    isString(suspectsSynonomous),
                    Array.isArray(suspectsSynonomous)
                ]
                .some(typeCheckValue => typeCheckValue)

                console.log('isSuspectsValid', isSuspectsValid)
                if(!isSuspectsValid){
                    error(suspectsSynonomous, 'suspect|suspects', '*#suspect');
                }

                if (typeof handler === 'function') {
                    // Add eventSetNames as pre-existing properties for linkage.
                    handlerLinkingList.push(eventSetName);
                    handlerList.push(handler);
                    resolvedHandler = handler;
                } else {
                    // Checks for handleLink.
                    resolvedHandler = handlerList[
                        handlerLinkingList.indexOf(handler)
                    ];
                }

                eventSetNameList.push(eventSetName);
                suspectsList.push(suspectsSynonomous);

                const isSuspectsLinkIndex = eventSetNameList
                    .indexOf(suspectsSynonomous);

                // Checks for suspectsLink.
                const resolvedSuspects = isSuspectsLinkIndex >= 0 ? suspectsList[
                    isSuspectsLinkIndex
                ] : suspectsSynonomous;

                return eventSetName.split(':')
                    .map(eventType =>
                        ({
                            eventType,
                            suspects: isString(resolvedSuspects) ? [
                                resolvedSuspects,
                            ] : resolvedSuspects,
                            handler: resolvedHandler,
                            eventSetName
                        })
                    );
            });

        // Flattern event listeners.
        const eventListeners = eventListeners2d.reduce(
            (a, b) => a.concat(b), []
        );

        // Set up event listeners for delegation. 
        addEventListeners(eventListeners);
    };
};

export default fireEnclosing();
