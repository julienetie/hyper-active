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
- If the target's ancestor matches one of the specified nodes
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

### parentElements
Override the parent element for delegaton. 
```javascript
click(someElement).closest(...nodes).fireAll(...callbacks);
```

### parentElements List
TBA: A list of default parent elements (Either document or window)

MIT 2018 © Julien Etienne
