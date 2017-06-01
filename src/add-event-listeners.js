/**
 * Attaches event listeners according to event discriptions.
 *
 * @param {Array} eventDescriptions - Event listener descriptions to be attached to the document.
 */
export default eventDescriptions => {
    const handler = (e, suspects, action) => {
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


    return eventDescriptions.map(({ eventType, targets, action }, index) => {
        document.addEventListener(eventType,
            e => handler(
                e,
                targets,
                action,
            ), false);
        return {
            eventType,
            targets,
            handler: action,
            useCapture: false,
            index,
        };
    });
};
