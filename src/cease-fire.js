import storage from './storage';
import isPlaneObject from '../libs/is-plane-object';
import { newError, hasProperty } from './helpers';

const notAnArray = 'ignoreSuspects should be an Array';



/**
 * API for removing events and ignoring suspects.
 *
 *@param {Object} ceaseFireConfig - ceaseFire Options.
 */
const ceaseFire = (ceaseFireConfig) => {
    // Ignore suspects
    if (hasProperty(ceaseFireConfig, 'ignoreSuspects')) {
        if (isPlaneObject(ceaseFireConfig.ignoreSuspects)) {
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
                return true;
            });
        } else {
            newError(notAnArray);
        }
    }
};


export default ceaseFire;
