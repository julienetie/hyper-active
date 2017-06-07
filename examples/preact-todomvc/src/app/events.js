import { fire } from 'yogafire';
import TodoItem from './item';



export default (context) => {
	
    // onChange={this.toggle}
// onDblClick={this.handleEdit}
    fire({
    	dblclick:{
    		suspects: ['.label'],
    		handler: e => {
    			// console.log(context)
    			
    		}
    	},
        change: {
            suspects: ['.toggle-all', '.toggle'],
            handler: (e, target) => {
                switch (target.className.trim()) {
                    case 'toggle-all':
                        context.toggleAll(e);
                        return;
                    case 'toggle':
                        context.toggle(e);
                        return;
                }
            }
        },
        CheckboxStateChange: {
            suspects: ['.toggle-all'],
            handler: e => {
                context.activeTodoCount(e)
            }
        },
        input: {
            suspects: ['.new-todo'],
            handler: e => {
                context.setState({ newTodo: e.target.value });
                console.log(context)
            }
        },
        keydown: {
            suspects: ['.new-todo'],
            handler: e => {
                context.handleNewTodoKeyDown(e);
            }
        }
    })
}
