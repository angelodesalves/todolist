import {createStore} from './lib/state';

const todosDefault = [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
        }
    ];

const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || todosDefault,
    filter: ''
};

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });

            localStorage.setItem("todos", JSON.stringify(state.todos) );
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }

            localStorage.setItem("todos", JSON.stringify(state.todos) );
            break;
        case 'TOGGLE_FILTER':
            state.filter = change.value;
            break;
    }
}

export const todos = createStore(todoChangeHandler, initialState);