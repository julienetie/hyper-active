(function(window, document, yogafire, undefined) {
    var fire = yogafire.fire;
    console.log('exportsApp', exportsApp)

    const elementIndex = element => {
        var list = [].slice.call(element.parentNode.children);
        var listLength = list.length;
        for (let i = 0; i < listLength; i++) {
            if (list[i] === element) {
                return i;
            }
        }
    }

    const changeView = view => exportsApp.visibility = view;

    fire({
        click: {
            suspect: ['.destroy', '.clear-completed', '.all', '.active', '.completed'],
            handler: (e, target) => {
                const handlers = {
                    destroy: () => {
                        var todo = target.closest('.todo');
                        var index = elementIndex(todo);
                        exportsApp.removeTodo(exportsApp.todos[index]);
                    },
                    'clear-completed': () => exportsApp.removeCompleted(e),
                    all: () => changeView('all'),
                    active: () => changeView('active'),
                    completed: () => changeView('completed'),
                }

                handlers[target.className.trim()]();
            }
        },
        dblclick: {
            suspect: '.label',
            handler: (e, target) => {
                var todo = target.closest('.todo');
                var index = elementIndex(todo);
                exportsApp.editTodo(exportsApp.todos[index]);
            }
        },
        focusout: {
            suspect: '.edit',
            handler: (e, target) => {
                var todo = target.closest('.todo');
                var index = elementIndex(todo);
                exportsApp.doneEdit(exportsApp.todos[index]);
            }
        },
        keypress: {
            suspects: ['.new-todo'],
            handler: (e, target) => {
                if (e.keyCode === 13 && target.value.length) {
                    exportsApp.addTodo();
                }
            }
        },
        keyup: {
            suspect: '.edit',
            handler: (e, target) => {
                var todo = target.closest('.todo');
                var index = elementIndex(todo);
                switch (e.keyCode) {
                    case 13:
                        exportsApp.doneEdit(exportsApp.todos[index]);
                        return;
                    case 27:
                        exportsApp.cancelEdit(exportsApp.todos[index]);
                        return;
                }
            }
        },
    });


})(window, document, yogaFire);
