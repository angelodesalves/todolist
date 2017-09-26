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
        return `${renderAddTodoAtBottom(input, todoList)}
                ${isEnabled('filter') ? renderFilter(filter) : ''}`;
    } else {
        return `${renderAddTodoAtTop(input, todoList)}
                ${isEnabled('filter') ? renderFilter(filter) : ''}`;
    }
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
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
            <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
            ${todo.text}
        </li>`;
    }
}

function renderFilter(filter) {
    return `
            <label for="done1">
                <input type="radio" name="done" id="done1" value="" ${filter=='' ? 'checked="true"' : ''}> Mostrar todos
            </label>
            <label for="done2">
                <input type="radio" name="done" id="done2" value="false" ${filter=='false' ? 'checked="true"' : ''}> Somente abertos
            </label>
            <label for="done3">
                <input type="radio" name="done" id="done3" value="true" ${filter=='true' ? 'checked="true"' : ''}> Somente fechados
            </label>
        `;
}
