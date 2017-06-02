########
yogafire
########

.. image:: https://preview.ibb.co/bYQGNa/yoga_fire.gif


```
Alpha: Not for production.
```

A Flexible Event Delegation Library
###################################


Event delegation
================

.. code:: javascript
  
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

Ignore Targets
=======================

.. code:: javascript
  
    import { ceaseFire } from 'yogafire';

    ceaseFire({
      ignoreTargets: ['.target1', '.target2']
    })
    

Remove delegated events
=======================

.. code:: javascript
  
    import { ceaseFire } from 'yogafire';

    ceaseFire({
      removeEvents: [
          'mousemove:dblclick',
          'blur'
      ]
    })


Single events
=============

.. code:: javascript
  
    const singleCeaseFires = fire(['.target1', '#target2'], 'click', () => console.log('Hello World!'), false)


Remove single events
====================

.. code:: javascript
    singleCeaseFires.map(ceaseFire => ceaseFire())


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
- Remove events without parameters.
- Ability to ignore tracked targets.

MIT 2017 © Julien Etienne
