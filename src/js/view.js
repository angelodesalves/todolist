import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map( (todo) => renderTodoItem(todo, state.filter) ).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        state.filter
    );
}

function renderApp(input, todoList, filter) {
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList, filter);
    } else {
        return renderAddTodoAtTop(input, todoList, filter);
    }
}

function renderAddTodoAtTop(input, todoList, filter) {
    return `<div id="app">
        ${input}
        ${todoList}
        ${isEnabled('filter') ? renderFilter(filter) : ''}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList, filter) {
    return `<div id="app">
        ${isEnabled('filter') && isEnabled('filterTop') ? renderFilter(filter) : ''}
        ${todoList}
        ${input}
        ${isEnabled('filter') && !isEnabled('filterTop') ? renderFilter(filter) : ''}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo, filter) {
    if( filter=='' || JSON.parse(filter)==todo.done ){
        const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
        return `<li class="${todoClass}">
            <input class="js_toggle_todo" type="checkbox" id="todo-${todo.text}" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
            <label for="todo-${todo.text}">${todo.text}</label>
        </li>`;
    }
}

function renderFilter(filter) {
    return `
            <input type="radio" name="done" id="done1" value="" ${filter=='' ? 'checked="true"' : ''}>
            <label for="done1">
                Mostrar todos
            </label>
            <input type="radio" name="done" id="done2" value="false" ${filter=='false' ? 'checked="true"' : ''}>
            <label for="done2">
                Somente abertos
            </label>
            <input type="radio" name="done" id="done3" value="true" ${filter=='true' ? 'checked="true"' : ''}>
            <label for="done3">
                Somente fechados
            </label>
        `;
}
