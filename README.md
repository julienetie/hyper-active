```
Alpha: Not ready for production.
```
# yogafire
<img src="https://preview.ibb.co/bYQGNa/yoga_fire.gif">

## A Flexible Event Delegation Library

### Equals 
If the target equals a suspect fire the respective handler.
```javascript
click.equals(...suspects).fire(...handlers);
```
This eliminates the need for conditional logic per-element when delegating a single event. 
Every time you initiate an event it creates a _delegate_

If one handler is provided for multiple suspects, any triggered suspect will fire the handler.
```javascript
click.equals(...suspects).fire(handler);
```
### Closest 
If a suspect is the ancestor of the target fire the respective handler.
```javascript
click.closest(...suspects).fire(...handlers);
``` 
Multiple suspects, one handler.
```javascript
click.closest(...suspects).fire(handler);
```
### Not Closest
Prevents a handler from being called if the sucessfully targeted suspect is a decendant of an excluded suspect. 
```javascript
// Equals X,Y,Z but is not a decendant of A,B,C
click.equals(...suspects).not.closest(...excludedSuspects).fire(...handlers);

// Decendant of X,Y,Z but is not a decendant of A,B,C
click.closest(...suspects).not.closest(...excludedSuspects).fire(...handlers);

// Contains of X,Y,Z but is not a decendant of A,B,C
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
Prevents a handler from being called if the sucessfully targeted suspect contains an excluded suspect. 
```javascript
// Equals X,Y,Z but is not a decendant of A,B,C
click.equals(...suspects).not.contains(...excludedSuspects).fire(...handlers);

// Decendant of X,Y,Z but is not a decendant of A,B,C
click.closest(...suspects).not.contains(...excludedSuspects).fire(...handlers);

// Contains of X,Y,Z but is not a decendant of A,B,C
click.contains(...suspects).not.contains(...excludedSuspects).fire(...handlers);
```
### Remove 
Removes: 
- The event listener from the document
- All delegates associated with that event
```javascript
click.remove();
```
