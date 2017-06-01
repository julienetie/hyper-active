<img src="http://oi65.tinypic.com/oiuo06.jpg" width="300px">

```
Alpha: Not for production.
```

# yogaFire

## A Flexible Event Delegation Library



### Event delegation
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
### Remove delegated events
```javascript
import { ceaseFire } from 'yogafire';

ceaseFire({
  ignoreTargets: ['.target1', '.target2'],
  removeEvents: [
      'mousemove:dblclick',
      'blur'
  ]
})
```
### Single events
```javascript
const singleCeaseFires = fire(['.target1', '#target2'], 'click', () => console.log('Hello World!'), false)
```
### Remove single events
```javascript
singleCeaseFires.map(ceaseFire => ceaseFire())
```

- No dependencies.
- IE9+s support (No legacy bloat).
- Synthetic events: Pollyfills and normalises event inconsistencies. (TBA)
- Supports multiple targets.
- Supports multiple event types.
- Shared actions by link reference.
- Shared targets by link reference.
- Mouseenter and mouseleave emulation. (TBA)
- Debounce feature. (TBA)
- Extended parameters. (TBA)
- Target ancestors, siblings, ancestor siblings (TBA).
- Synthetic single events.

MIT 2017 (c) Julien Etienne
