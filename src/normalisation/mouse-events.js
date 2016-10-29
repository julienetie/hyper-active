// /**
//  * Browser Support:
//  * 
//  * Safari: 		6+
//  * Chrome:
//  * Opera:       18+
//  * IE: 			9+
//  * Firefox:     
//  * Edge:      
//  * 
//  * IOS: 		6+
//  * Android M:   4+
//  * Chrome M:     
//  * Earlier versions may work but will not be supported in development.
//  */


// export {
// 	/*
// 		MouseEvent.buttons
// 		¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯	
// 	*/
// 	buttons(event) {
// 		if ('buttons' in event) {
// 			return event.buttons;
// 		} else if ('which' in event) {
// 			let value = event.which;
// 			if (value === 2) {
// 				return 4;
// 			} else if (value === 3) {
// 				return 2;
// 			} else if (value > 0) {
// 				return 1 << (value - 1);
// 			}
// 		}

// 	},
// 	/*	
// 		MouseEvent.relatedTarget
// 		¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
// 	*/
// 	relatedTarget(event) {
// 		return event.relatedTarget || (
// 			event.fromElement === event.target ?
// 			event.toElement : event.fromElement);
// 	}

// }

export function buttons(event) {
	if ('buttons' in event) {
		return event.buttons;
	} else if ('which' in event) {
		let value = event.which;
		if (value === 2) {
			return 4;
		} else if (value === 3) {
			return 2;
		} else if (value > 0) {
			return 1 << (value - 1);
		}
	}

}

export function relatedTarget(event) {
	return event.relatedTarget || (
		event.fromElement === event.target ?
		event.toElement : event.fromElement);
}
