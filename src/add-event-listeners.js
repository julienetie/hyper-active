import storage from './storage';
import { error, hasProperty, isString } from './helpers';

/** 
 * Converts a hypenated string into camel-case
 * @param {string}
 * @return {string} Camel-cased string. 
 */
const hypenatedToCamelCase = string => {
    const transfored = string.replace(/-([a-z])/g, g => g[1].toUpperCase()).replace(/-/g, '');
    return transfored[0].toLowerCase() + transfored.slice(1);
}

const camelCaseToHyphenated = string => {
    return string.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}

const cmdBindings = {
    '<': 'closest',
    '>': 'contains',
    '^': 'contact'
};

const getSelector = (config) => config.type === 'id' ? config.suspect : '[data-' + config.suspect + ']';
const getDataSelector = (config) => config.type === 'data' ? hypenatedToCamelCase(config.suspect) : null;

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
    const targetDetails = (e, suspects, eventSetName) => {

        const target = e.target;

        // Check for suspects to ignore.
        const hasSuspectsToIgnore = hasProperty(storage.ignoreSuspects, eventSetName);
        let vettedSuspects;

        if (hasSuspectsToIgnore) {
            const suspectsToIgnore = storage.ignoreSuspects[eventSetName];
            vettedSuspects = suspects.filter(suspect => !suspectsToIgnore.includes(suspect));
        } else {
            vettedSuspects = suspects;
        }

        const targetConfigs = suspects.map(entry => {
            if (entry === document) {
                return {
                    method: 'document'
                }
            }
            const parts = entry.split(' | ');
            const cmdBindingKey = parts.length === 2 ? parts[1].trim() : '<';
            const method = cmdBindings[cmdBindingKey] || (cmdBindingKey.length > 0 ? cmdBindingKey : 'closest'); // Default 
            const type = parts[0][0] === '#' ? 'id' : 'data';
            return {
                type,
                suspect: parts[0],
                method
            }
        });
        let match;
        let selector = null;
        let dataSelector = null;
        let suspect = null;
        const hasMatch = targetConfigs.some(config => {
            switch (config.method) {
                case 'closest': // Closest including the target element.
                    selector = getSelector(config);
                    dataSelector = getDataSelector(config);
                    suspect = config.suspect;
                    match = target.closest(selector);
                    return match !== null;
                case 'contains': // Contains, excluding the target element.
                    selector = getSelector(config);
                    dataSelector = getDataSelector(config);
                    suspect = config.suspect;
                    match = target.querySelector(selector);
                    return match !== null;
                case 'contact': // The target element.
                    switch(config.type){
                        case 'data':
                        selector = '[data-' + config.suspect + ']';
                        const camelCaseSelector = hypenatedToCamelCase(config.suspect);
                        match = target.dataset[camelCaseSelector] !== undefined;
                        break;
                        case 'id':
                        selector = config.suspect;
                        match = target.id === config.suspect.substr(1);
                        break;
                    }
                    suspect = config.suspect;
                    dataSelector = getDataSelector(config);
                    return match; 
                case 'document':
                    suspect = document;
                    match = document;
                    return true;
            }
        });
        return {
            hasMatch,
            match,
            selector,
            suspect,
            dataSelector,
        };
    };


    const attachedEvent = eventDescriptions
        .map(({ eventType, suspects, handler, eventSetName }, index) => {
            if (!isString(eventType)) {
                error(eventType, 'eventType', '*#eventType');
            }

            const handlerWrapper = e => {
                const { hasMatch, match, selector, dataSelector, suspect } = targetDetails(e, suspects, eventSetName);
                if (hasMatch) {
                    handler({
                        e,
                        target: e.target,
                        match,
                        selector,
                        dataSelector,
                        suspect
                    });
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