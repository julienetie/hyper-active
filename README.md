```
Alpha: Not ready for production.
```
# yogafire
<img src="https://preview.ibb.co/bYQGNa/yoga_fire.gif">

## A Flexible Event Delegation Library


### is() closest() & contains() with fire()
- For the click event 
- If the target matches one of the specified nodes
- Fire the respective callback i.e. (nodes[0] will trigger callbacks[0])
```javascript
click.is(...nodes).fire(...callbacks);
```
- Same as above except...
- If one of the specified nodes is the target's ancestor 
```javascript
click.closest(...nodes).fire(...callbacks);
```

- Same as above except...
- If the target contains one of the specified nodes
```javascript
click.contains(...nodes).fire(...callbacks);
```

### fireAll()
- Will fire all callbacks providing that a target is matched
```javascript
dblclick.contains(...nodes).fireAll(...callbacks);
```

### debounce() 
Will debounce the specified callbacks
- delay: In milliseconds 
- tail: A boolean to indicate the trailing behavior
```javascript
mousedown.contains(...nodes).debounce(delay,tail).fire(...callbacks);
```

### throttle() 
Will throttle the specified callbacks
- delay: In milliseconds 
```javascript
mousemove.contains(...nodes).throttle(delay).fire(...callbacks);
```
### Suspects as an object 
```javascript
click.contains({
  one: node,
  two: node,
  three: node
}).fire(...callbacks); // Objects are converted to arrays in alphabetical order.
```

### Handlers as an object.
```javascript
click.contains({
  one: node,
  two: node,
  three: node
}).fire({
  one: function,
  two: function,
  three: function
}); // Objects are converted to arrays in alphabetical order.
```
### name()
Adds a data attribute to each element which is also provided as parameters for triggered callback
```javascript
mouseup.contains(...nodes).name('side-bar').debounce(delay).fire(({name, target}) => {
  console.log(name) // sideBar2;
  console.log(target.dataset) // sideBar2
});
```


### ref()
References the event product so you can update, suspend or revivie it. 
```javascript
mousedown.contains(...nodes).name('side-bar').ref('side-bars').debounce(delay).fire(...callbacks);
```

### update()
Updates all suspects for the given event product reference.
```javascript
mousedown.update('side-bars', ...newSidebars);
```
Updates a specific suspect at the provided index of suspects
```javascript
mousedown.update('side-bars', newSidebar, 3);
```
### suspend()
Suspends an event product for a given reference
```javascript
mousedown.suspend('side-bars');
```

### revive()
Reactivates an event product for a given reference
```javascript
mousedown.revive('side-bars');
```

### remove()
Removes event listeners from the document, window and from any specified events
```javascript
mousedown.remove();
```

### debounce(): Standalone
A standalone debounce to use with native event listeners 
```javascript
const bouncedCallback = debounce(callback,delay,tail);
window.addEventListener('keyup', bouncedCallback, false);
```

### throttle(): Standalone
A standalone throttle to use with native event listeners 
```javascript
const throttledCallback = throttle(callback,delay,tail);
window.addEventListener('keyup', throttledCallback, false);
```

### parentElements
Override the parent element for delegaton. 
```javascript
click(someElement).closest(...nodes).fireAll(...callbacks);
```

### parentElements List
TBA: A list of events, their default parent elements (Either document or window) and their propagation defaults 

MIT 2018 © Julien Etienne
