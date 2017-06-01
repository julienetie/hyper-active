import isPlaneObject from '../libs/is-plane-object';
import addEventListeners from './add-event-listeners';
import { isString } from './helpers';
import singleEvents from './single-events';

const firePartial = () => {
    const actionsIndexReference = [];
    const actionsReference = [];
    const targetsIndexReference = [];
    const targetsReference = [];

    return (
        eventsObject,
        ...singleParams
    ) => {
        if (!isPlaneObject(eventsObject)) {
            return singleEvents(eventsObject, ...singleParams);
        }
        const eventsObjectKeys = Object.keys(eventsObject);

        const eventListenersMulti = eventsObjectKeys
            .map((eventTypes, i) => {
                const { target, targets, action } = eventsObject[
                    eventTypes
                ];
                const eventsGroupTargets = targets || target;
                let actionCopy;

                if (typeof action === 'function') {
                    actionsIndexReference.push(eventTypes);
                    actionsReference.push(action);
                    actionCopy = action;
                } else {
                    actionCopy = actionsReference[
                        actionsIndexReference.indexOf(action)
                    ];
                }

                targetsIndexReference.push(eventTypes);
                targetsReference.push(eventsGroupTargets);

                const targetsIndex = targetsIndexReference
                    .indexOf(eventsGroupTargets);
                const targetsCopy = targetsIndex >= 0 ? targetsReference[
                    targetsIndex
                ] : eventsGroupTargets;

                return eventTypes.split(':')
                    .map(eventType => ({
                        eventType,
                        targets: isString(targetsCopy) ? [
                            targetsCopy,
                        ] : targetsCopy,
                        action: actionCopy,
                        identity: eventsObjectKeys[i]
                    }));
            });

        const eventListeners = eventListenersMulti
            .reduce((a, b) => a.concat(b), []);

        // attachedEvents.push(eventListeners);

        addEventListeners(eventListeners);
    };
};

export default firePartial();
