# hyper-active
A library for DOM event management

[Prototype of api design](https://github.com/julienetie/hyper-active/wiki/API-prototype)

```php
(Prototype, not for production)
```
hyperActive has no dependencies and can be used in any browser based project.
hyperActive supports virtual-dom event delegation via Hypertext


hyperActive is an events library that provides the following:

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
hyperActive integrates with Hypertext's eventStore:

```javascript

import { eventStore } from 'hypertext';
import { hyperActive } from 'hyper-active';

hyperActive.getEventStore(eventStore ...);
```
When delegating by node comparision, the eventStore should contain all created elements that require event management.
At certain times when the UI is updated or a particular interface is being patched and an element is being created or removed, the eventStore will also reflect those changes (important to prevent memory leaks).
**getEventStore should be called when an element is created/ removed for specific intefaces or the entire UI**


Node comparision can only be used for libraries that provide an eventStore in the fasion of Hypertext. 

The design of this API is in progress.
