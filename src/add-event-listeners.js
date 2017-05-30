export default eventListeners => {
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


    eventListeners.forEach(eventListener => {
        document.addEventListener(eventListener.eventType,
            e => handler(e, eventListener.targets, eventListener.action), false);
    });
};
