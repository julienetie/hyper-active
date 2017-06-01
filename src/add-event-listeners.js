import storage from './attached-events';

/**
 * Attaches event listeners according to event discriptions.
 *
 * @param {Array} eventDescriptions - Event listener descriptions to be attached to the document.
 */
export default eventDescriptions => {
    const innerHandler = (e, suspects, action) => {
        const checkTagName = (cleanSuspects, tagName) => {
            if (cleanSuspects.includes(tagName)) {
                action(e);
            }
        };

        const target = e.target;
        const cleanSuspects = suspects.map(suspect => suspect.replace('.', '').replace('#', ''));

        if (cleanSuspects.includes(target.id)) {
            action(e);
        } else if (target.className) {
            const hasClass = cleanSuspects
                .filter(suspect => target.className.includes(suspect)).length > 0;

            if (hasClass) {
                action(e);
            } else {
                checkTagName(cleanSuspects, target.tagName);
            }
        } else {
            checkTagName(cleanSuspects, target.tagName);
        }
    };


    const resolvedEvents = eventDescriptions.map(({ eventType, targets, action , identity}, index) => {
        const handler = e => innerHandler(e, targets, action);

        const addEvent = () => document.addEventListener(eventType, handler, false);
        addEvent();

        const removeEvent = () => document
            .removeEventListener(eventType, handler, false);

        return {
            eventType,
            targets,
            handler: action,
            useCapture: false,
            identity,
            index,
            addEvent,
            removeEvent,
        };
    });

    storage.attachedEvents = resolvedEvents;
};
