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
            suspects: ['.suspect1', '.suspect2', '.suspect3'],
            handler: ({target}) => console.log(`The target is ${target.className}` 
        },
        'mousemove:dblclick': {
            suspect: 'click' // Link reference
            handler: aFunctionForMouseMoveDoubleClickAndBlurSeeTheBelowReference
        },
        blur: {
            suspects: [input1,input2, '#textArea'],
            handler: 'mousemove:dblclick' // Link reference
        } 
      })

Ignore targets
=======================

.. code:: javascript
  
    import { ceaseFire } from 'yogafire';

    ceaseFire({
      ignoreSuspects: ['.suspect1', '.suspect2']
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
  
    const singleCeaseFires = fire(['.suspect1', '#suspect2'], 'click', () => console.log('Hello World!'), false)


Remove single events
====================

.. code:: javascript

    singleCeaseFires.map(ceaseFire => ceaseFire())


Details
=======

- No dependencies.
- IE9+s support (No legacy bloat).
- Synthetic events: Pollyfills and normalises event inconsistencies. (TBA)
- Supports multiple suspects.
- Supports multiple event types.
- Shared handlers by link reference.
- Shared suspects by link reference.
- Mouseenter and mouseleave emulation. (TBA)
- Debounce feature. (TBA)
- Extended parameters. (TBA)
- Target ancestors, siblings, ancestor siblings (TBA).
- Synthetic single events.
- Remove events without parameters.
- Ability to ignore tracked suspects.

MIT 2017 © Julien Etienne
