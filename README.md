```
Alpha: Not ready for production.
```
# yogafire

<img src="https://preview.ibb.co/bYQGNa/yoga_fire.gif">

## A Flexible Event Delegation Library

### Equals 
If the target is equal to a suspect, fire the respective handler.
```javascript

click.equals(...suspects).fire(...handlers);
```
This eliminates the need for conditional logic per-element when delegating for a single event. 
Every time you initialise an event it adds a _delegate_ to the event. A delegate is just a set of conditions 
define as seen above.

If one handler is provided for multiple suspects either triggered suspect will fire the handler.
```javascript

click.equals(...suspects).fire(handler);
```
### Closest 
If a suspect is the ancestor of the target, fire the respective handler.
```javascript

click.closest(...suspects).fire(...handlers);
``` 
Multiple suspects, one handler.
```javascript

click.closest(...suspects).fire(handler);
```
### Not Closest
Prevents a handler from being called if the successfully targeted suspect is a member of the excluded suspect as an ancestor. 
```javascript

// Equals X,Y,Z but is not a ancestor of A,B,C
click.equals(...suspects).not.closest(...excludedSuspects).fire(...handlers);

// Ancestor of X,Y,Z but is not a ancestor of A,B,C
click.closest(...suspects).not.closest(...excludedSuspects).fire(...handlers);

// Contains of X,Y,Z but is not a ancestor of A,B,C
click.contains(...suspects).not.closest(...excludedSuspects).fire(...handlers);
```
### Contains 
If a suspect is contained within the target fire the respective handler.
```javascript

click.contains(...suspects).fire(...handlers);
``` 
Multiple suspects, one handler.
```javascript

click.closest(...suspects).fire(handler);
```
### Not Contains
Prevents a handler from being called if the successfully targeted suspect is a member of the excluded suspect contained within the target.

```javascript
// Equals X,Y,Z but is not a ancestor of A,B,C
click.equals(...suspects).not.contains(...excludedSuspects).fire(...handlers);

// Ancestor of X,Y,Z but is not an ancestor of A,B,C
click.closest(...suspects).not.contains(...excludedSuspects).fire(...handlers);

// Contains of X,Y,Z but is not an ancestor of A,B,C
click.contains(...suspects).not.contains(...excludedSuspects).fire(...handlers);
```

### Delegate Names (*TBA*) 
Name the delegate to reference it in the future. 
```javascript

click('nav-buttons').equals(...suspects).fire(...handlers);
```

### Remove 
Removes: 
- The event listener from the document
- All delegates associated with the event

```javascript
click.remove();
```
You can also remove a specific delegate which will return true if it was removed 
and false if it did not exist.
*TBA*
```javascript
click.remove('nav-buttons');
```


### Non-document EventTarget (*TBA*)
By default `document` is the EventTarget when using properties from events directly. 
There are scenarios where you may need to delegate from `windodw`.
You can delegate from the window object when using the event as a function.
```javascript

click(window).closest(...suspects).fire(...handlers);

// or 

click({
 name: 'nav-buttons',
 eventTarget: window
}).closest(...suspects).fire(...handlers);
``` 
You can also delegate events from any element but this should be avoided if possible as it defeats the purpose of event delegation.

```javascript

click(sidebar).contains(...suspects).fire(...handlers);
``` 

### Options (*TBA*)
You can pass options to the event listener by providing the options property.
```javascript
click({
 name: 'nav-buttons',
 eventTarget: window,
 options:{
   once: true,
   passive: true,
   capture: true
 }
}).equals(...suspects).fire(...handlers);
``` 

### Replenish (*TBA*)
Updates the references for the left-sidebar delegate respectively.
```javascript
click.replenish('left-sidebar',el1,el2, el3);
```
To preserve references use null
```javascript
click.replenish('left-sidebar',el1,null, el3, null, null, el6);
```
### Auto Replenish (*TBA*)
This will automatically remove all references to elements that no longer exist 
or that are not apart of the DOM. This will prevent memeory leaks.
It's ideal to call it during idletime via requestIdleCallback.
```javascript
click.replenish();
```
