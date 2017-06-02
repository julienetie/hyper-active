import storage from './storage';

/**
 * Attaches event listeners according to event discriptions.
 *
 * @param {Array} eventDescriptions - Event listener descriptions to be attached to the document.
 */
export default eventDescriptions => {
    /** 
     * Checks if a tagName exist within suspects.
     *
     * @param {} cleanSuspects - suspects with removed prefixes. 
     * @param {String} tagName - target tagName.
     */
    const checkTagName = (cleanSuspects, tagName) => cleanSuspects.includes(tagName);


    /**
     * isTarget manages suspects, targets and the storage.ignoredTargets data.
     * 
     * @param {Object} e - The event object.
     * @param {Array} suspects - The possible targets.
     * @param {Function} action - The API handler value. 
     */
    const isTarget = (e, suspects, identity) => {
        const target = e.target;

        // Check if there are suspects to ignore.
        const hasSuspectsToIgnore = storage.ignoreTargets.hasOwnProperty(identity);
        let vettedSuspects;

        if (hasSuspectsToIgnore) {
            const suspectsToIgnore = storage.ignoreTargets[identity];
            vettedSuspects = suspects.filter(
                suspect => !suspectsToIgnore.includes(suspect)
            );
        } else {
            vettedSuspects = suspects;
        }

        const cleanSuspects = vettedSuspects.map(
            suspect => suspect.replace('.', '').replace('#', '')
        );

        // Id match.
        if (cleanSuspects.includes(target.id)) {
            return true;

            // Class match.
        } else if (target.className) {
            const hasClass = cleanSuspects
                .filter(suspect => target
                    .className
                    .includes(suspect)
                ).length > 0;

            if (hasClass) {
                return true;
            } else {

                // TagName match.
                return checkTagName(cleanSuspects, target.tagName);
            }

            /*@TODO Throw error */
        } else {

            // TagName match.
            return checkTagName(cleanSuspects, target.tagName);
        }

        /*@TODO Throw error */
    };


    const resolvedEvents = eventDescriptions
        .map(({ eventType, targets, action, identity }, index) => {
            const handler = e => {

                if (isTarget(e, targets, identity)) {
                    action(e);
                }
            };
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
