import storage from './storage';
import { newError, hasProperty, type } from './helpers';

const notAnArray = 'ignoreSuspects should be an Array';


/**
 * API for removing events and ignoring suspects.
 *
 * @param {Object} ceaseFireConfig - Ceasefire Options.
 */
const ceasefire = ceaseFireConfig => {
    // Ignore suspects
    if (hasProperty(ceaseFireConfig, 'ignoreSuspects')) {
        if (type(ceaseFireConfig.ignoreSuspects, 'Object')) {
            Object.keys(ceaseFireConfig.ignoreSuspects)
                .map(suspectToIgnore => {
                    const ignoredValue = ceaseFireConfig.ignoreSuspects[
                        suspectToIgnore
                    ];
                    const ignoredValueArray = Array
                        .isArray(ignoredValue) ? ignoredValue : [ignoredValue];

                    // Add suspect to ignoreSuspects.
                    storage.ignoreSuspects[
                        suspectToIgnore
                    ] = ignoredValueArray;

                    // @todo Doing nothing.
                    return suspectToIgnore;
                });
        } else {
            newError(notAnArray);
        }
    }

    // Remove Events.
    if (hasProperty(ceaseFireConfig, 'removeEvents')) {
        if (Array.isArray(ceaseFireConfig.removeEvents)) {
            storage.attachedEvents = storage.attachedEvents.filter(eventDetails => {
                const hasEventToRemove = ceaseFireConfig.removeEvents.some(
                    eventToRemove => eventToRemove === eventDetails.identity);

                if (hasEventToRemove) {
                    // Remove Event.
                    eventDetails.removeEvent();
                    return false;
                }
                // @todo Doing nothing.
                return true;
            });
        } else {
            newError(notAnArray);
        }
    }
};


export default ceasefire;