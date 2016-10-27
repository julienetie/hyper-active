# Yoga Fire
Advanced Event Delegation

[Prototype of api design](https://github.com/julienetie/yogafire/wiki/API-prototype)

```php
(Prototype, not for production)
```
yogaFire has no dependencies and can be used in any browser based project.
yogaFire supports virtual-dom event delegation via yogaFire


yogaFire is an events library that provides the following:

#### Event delgation detectin.
- Event delegation by selector comparision
- Event delegation by node comparision

#### Event delegation patterns.
- Global Event delegation
- interface pattern

#### Direct listeners.
- Native addEventListener for virtual nodes
- addMutationListener (via WeakMaps)

## Events for Hypertext 
yogaFire integrates with Hypertext's eventStore:

```javascript

import { eventStore } from 'hypertext';
import { hyperActive } from 'yogafire';

yogaFire.getEventStore(eventStore ...);
```
When delegating by node comparision, the eventStore should contain all created elements that require event management.
At certain times when the UI is updated or a particular interface is being patched and an element is being created or removed, the eventStore will also reflect those changes (important to prevent memory leaks).
**getEventStore should be called when an element is created/ removed for specific intefaces or the entire UI**


Node comparision can only be used for libraries that provide an eventStore in the fasion of Hypertext. 

The design of this API is in progress.
