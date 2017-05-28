<img src="http://oi65.tinypic.com/oiuo06.jpg" width="300px">
# yogaFire
A Flexible Event Delegation Library

```php
Prototype, don't use this library just yet!
```
## Simple Event Delegation  
yogaFire allows you to compose complex event delegation patterns with all the necessary tools at your fingertips.

#### Fire events with yogaFire Event Delegation.
```javascript 
import { fire } from 'yogafire';

fire({
    click: {
        targets: ['.target1', '.target2', '.target3'],
        action: ({target}) => console.log(`This target is ${target.className}` 
    },
    'mousemove:dblclick': {
        targets: 'click' // Link reference
        action: aFunctionForMouseMoveDoubleClickAndBlurSeeTheBelowReference
    },
    blur: {
        target: [input1,input2, '#textArea'],
        action: 'mousemove:dblclick' // Link reference
    } 
  })
```
#### Remove events
Remove specific targets or entire event listeners.
```
import { ceaseFire } from 'yogafire';

ceaseFire({
  ignoreTargets: ['.target1', '.target2'],
  removeEvents: [
      'mousemove:dblclick',
      'blur'
  ]
})

```


- yogaFire has no dependencies and can be use in any browser based project.
- Supports IE9+ (No legacy bloat).
- Synthetic events: Pollyfills and normalises event inconsistencies.
- Multiple targets.
- Multiple event types.
- Shared actions by link reference.
- Shared targets by link reference.
- Mouseenter and mouseleave emulation.
- Debounce.
- Remove events or ignore targets using ceaaseFire.
- Extended parameters: event, target, parent, normalisation, interface and data.
- Ideal for mobile performance.
- Target ancestors, siblings, ancestor siblings (TBA). 
- Event chaining (TBA).
- Standard eventlistener wrapper for synthetic events.

MIT 2017 (c) Julien Etienne
