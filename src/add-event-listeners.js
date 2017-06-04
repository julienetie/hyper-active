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
     * @param {Function} eventSetName - The fireConfig property name. 
     */
    const isTarget = (e, suspects, eventSetName) => {
        const target = e.target;

        // Check for suspects ot ignore.
        const hasSuspectsToIgnore = storage.ignoreSuspects
            .hasOwnProperty(eventSetName);
        let vettedSuspects;

        if (hasSuspectsToIgnore) {
            const suspectsToIgnore = storage.ignoreSuspects[eventSetName];
            vettedSuspects = suspects.filter(
                suspect => !suspectsToIgnore.includes(suspect)
            );
        } else {
            vettedSuspects = suspects;
        }

        // Removes class and id prefixes.
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


    const attachedEvent = eventDescriptions
        .map(({ eventType, suspects, handler, eventSetName }, index) => {
            
            const handlerWrapper = e => {
                if (isTarget(e, suspects, eventSetName)) {
                    handler(e, e.target);
                }
            };

            const addEvent = () => document.addEventListener(
                eventType, handlerWrapper, false
            );
            addEvent();
            const removeEvent = () => document.removeEventListener(
                eventType, handlerWrapper, false
            );

            return {
                eventType,
                suspects,
                handler,
                useCapture: false,
                eventSetName,
                index,
                addEvent,
                removeEvent,
            };
        });

    // Share attached events between modules.
    storage.attachedEvents = attachedEvent;
};
