```
Alpha: Not ready for production.
```
# yogafire
<img src="https://preview.ibb.co/bYQGNa/yoga_fire.gif">

## A Flexible Event Delegation Library


- For the click event 
- If the target matches one of the specified nodes
- Fire the respective callback i.e. (nodes[0] will trigger callbacks[0])
```javascript
click.is(...nodes).fire(...callbacks);
```
- If the target's ancestor matches one of the specified nodes
```javascript
click.closest(...nodes).fire(...callbacks);
```

- If the target contains one of the specified nodes
```javascript
click.contains(...nodes).fire(...callbacks);



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


MIT 2018 © Julien Etienne
