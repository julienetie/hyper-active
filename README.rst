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

- No dependencies
- 7kb minified
- Improve performance (ideal for mobile devices)
- Significantly reduce event listener usage
- Reduce or eliminate memory leaks
- Improve maintainability of events
- Improve life-cycle predictability of events
- Provide delegation helper parameters to reduce conditional logic
- provide a clean events removal system
- IE9+ support (Dropping IE9 + IE10 soon) 
- Debounce feature. (TBA)
- Target ancestors, siblings, ancestor siblings (TBA).


MIT 2017 © Julien Etienne
