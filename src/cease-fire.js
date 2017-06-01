import storage from './attached-events';
import { newError } from './helpers';

const notAnArray = 'ignoreTargets should be an Array';

const ceaseFire = (ceaseFireOptions) => {
        console.log('fwefw')
        if (ceaseFireOptions.hasOwnProperty('ignoreTargets')) {
            if (Array.isArray(ceaseFireOptions.ignoreTargets)) {
                // console.log(ceaseFireOptions.ignoreTargets); 	
            } else {
                newError(notAnArray);
            }

        }

        // Remove event listeners
        if (ceaseFireOptions.hasOwnProperty('removeEvents')) {
            if (Array.isArray(ceaseFireOptions.removeEvents)) {
             
                storage.attachedEvents = storage.attachedEvents.filter(eventDetails => {
                    const hasEventToRemove = ceaseFireOptions.removeEvents.includes(eventDetails.identity)
                    console.log(hasEventToRemove)
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
