
export function toggleTodoState(id) {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
}

export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}

export function toggleFilter(value) {
    return {
        type: 'TOGGLE_FILTER',
        value
    }
}
