import storage from './storage';
import { error, hasProperty, isString } from './helpers';

/**
 * Attaches event listeners according to event discriptions.
 *
 * @param {Array} eventDescriptions - Event listener descriptions to be attached to the document.
 */
export default eventDescriptions => {
    /**
     * Checks if a tagName exist within suspects.
     *
     * @param {Array} cleanSuspects - Suspects with removed prefixes.
     * @param {string} tagName - Target tagName.
     */
    const checkTagName = (cleanSuspects, tagName) => cleanSuspects.includes(tagName);


    /**
     * Manages suspects, targets and the storage.ignoredTargets data.
     *
     * @param {Object} e - The event object.
     * @param {Array} suspects - The possible targets.
     * @param {Function} eventSetName - The fireConfig property name.
     */
    const isTarget = (e, suspects, eventSetName) => {
        const target = e.target;
        const targetClassName = target.className;

        // Check for suspects ot ignore.
        const hasSuspectsToIgnore = hasProperty(storage.ignoreSuspects, eventSetName);
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
        } else if (targetClassName) {
            const hasClass = cleanSuspects
                .filter(suspect => targetClassName.includes(suspect)).length > 0;
            if (hasClass) {
                return true;
            }
            return checkTagName(cleanSuspects, target.tagName);
        }
        return checkTagName(cleanSuspects, target.tagName);
    };


    const attachedEvent = eventDescriptions
        .map(({ eventType, suspects, handler, eventSetName }, index) => {
            if (!isString(eventType)) {
                error(eventType, 'eventType', '*#eventType');
            }

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
                removeEvent
            };
        });
    // Share attached events between modules.
    storage.attachedEvents = attachedEvent;
};
