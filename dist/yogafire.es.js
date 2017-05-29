// import { yoga } from './yoga-fire';


const addEventListeners = eventListeners => {
    const eventListenersLength = eventListeners.length;
    let eventListener;
    let suspects;

    for (let i = 0; i < eventListenersLength; i++) {
        eventListener = eventListeners[i];
        suspects = eventListener.targets;
        // console.log('suspects', suspects)
        document.addEventListener(eventListener.eventType, e => {
            const target = e.target;

            let suspect;

            for (let i = 0; i < suspects.length; i++) {
                // console.log(suspects)
                suspect = suspects[i];
                // console.log(suspect)
                if (suspect.includes('.')) {
                    if (suspect === target.className) {
                        eventListener.action(e);
                        return;
                    }
                } else if (suspect.includes('#')) {
                    if (suspect === target.id) {
                        eventListener.action(e);
                        return;
                    }
                } else {
                    if (suspect.toUpperCase() === target.id.tagName) {
                        eventListener.action(e);
                        return;
                    }
                }
            }

            // Check if each target contains a: dot, hash, attribute type, or none
            // for each selector type identified check that of the target
            // if the target matches, fire the handler with modified parameters.

            // Change the event parameters
            // eventListener.action(e);
        }, false);
    }
};

// removeEventListener 
const ceaseFire = () => {};

const eventListeners = [];
const actionsIndexReference = [];
const actionsReference = [];
const targetsIndexReference = [];
const targetsReference = [];
/**
 * 
 */
const fire = eventsObject => {
    for (let eventType in eventsObject) {
        const { target, targets, action } = eventsObject[eventType];
        const eventsGroupTargets = targets || target;

        let actionCopy;
        let isActionCopy;
        let targetsCopy;
        let isTargetsCopy;

        // List of real actions.
        if (typeof action === 'function') {
            actionsIndexReference.push(eventType);
            actionsReference.push(action);
            actionCopy = action;
        } else {
            actionCopy = actionsReference[actionsIndexReference.indexOf(action)];
        }

        // Add Targets.
        targetsIndexReference.push(eventType);
        targetsReference.push(eventsGroupTargets);

        const targetsIndex = targetsIndexReference.indexOf(eventsGroupTargets);
        if (targetsIndex >= 0) {
            targetsCopy = targetsReference[targetsIndex];
        } else {
            targetsCopy = eventsGroupTargets;
        }

        eventType.split(':').forEach(eventType => {
            eventListeners.push({
                eventType,
                targets: targetsCopy,
                action: actionCopy
            });
        });
    }

    addEventListeners(eventListeners);
    // console.log(eventListeners)
};

// if single event use synthetic events with bubble and capture.
/*
yogaFire([events array], 'click', ()=>{});
*/

export { ceaseFire, fire };
