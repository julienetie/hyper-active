 /**
  Yogafire Vue.js example:
 **/
 // console.log('NAME', youga)
 {
     const fire = yogafire.yogafire;

     const elementIndex = element => {
         const list = Array.from(element.parentNode.children);
         const listLength = list.length;
         for (let i = 0; i < listLength; i++) {
             if (list[i] === element) {
                 return i;
             }
         }
     }

     const actionTodo = (type) => {
         return (e, target) => {
             console.log(e, target)
             const todo = target.closest('.todo');
             const index = elementIndex(todo);
             exportsApp[type](exportsApp.todos[index]);
         }
     }

     const editTodo = actionTodo('editTodo');
     const doneEdit = actionTodo('doneEdit');
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
             handler: editTodo
         },
         focusout: {
             suspect: '.edit',
             handler: doneEdit
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
                 const todo = target.closest('.todo');
                 const index = elementIndex(todo);
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
 }