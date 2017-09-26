import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, toggleFilter} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
        document.getElementById('todoInput').focus();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
    
    listen('keyup', '#todoInput', event => {
    	if (event.keyCode == 13) {
    		document.getElementById('addTodo').click();
    	}
    });

    listen('change', '[name="done"]', event => {
    	todos.dispatch( toggleFilter( document.querySelector('input[name="done"]:checked').value ) );
    });
}
