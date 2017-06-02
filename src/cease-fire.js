import storage from './storage';
import isPlaneObject from '../libs/is-plane-object';
import { newError } from './helpers';

const notAnArray = 'ignoreTargets should be an Array';

const ceaseFire = (ceaseFireOptions) => {
    if (ceaseFireOptions.hasOwnProperty('ignoreTargets')) {
        if (isPlaneObject(ceaseFireOptions.ignoreTargets)) {
            Object.keys(ceaseFireOptions.ignoreTargets)
                .map(eventSetNamesOfignored => {

                    if (!storage.hasOwnProperty('ignoreTargets')) {
                        storage.ignoreTargets = {};
                    }

                    const ignoredValue = ceaseFireOptions.ignoreTargets[eventSetNamesOfignored];
                    const ignoredValueArray = Array.isArray(ignoredValue) ? ignoredValue : [ignoredValue];
                    storage.ignoreTargets[eventSetNamesOfignored] = ignoredValueArray;
                })
        } else {
            newError(notAnArray);
        }
    }
    console.log('storage', storage)
    if (ceaseFireOptions.hasOwnProperty('removeEvents')) {
        if (Array.isArray(ceaseFireOptions.removeEvents)) {
            storage.attachedEvents = storage.attachedEvents.filter(eventDetails => {
                const hasEventToRemove = ceaseFireOptions.removeEvents.some(eventToRemove => eventToRemove === eventDetails.identity);
               
                if (hasEventToRemove) {
                    eventDetails.removeEvent();
                } else {
                    return eventDetails;
                }
            });
        } else {
            newError(notAnArray);
        }
    }
};


export default ceaseFire;
