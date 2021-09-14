if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    let todoList = document.getElementsByClassName('todo-list')[0]
    let todoItemsButtons = todoList.getElementsByClassName('btn-toggle-item')
    let todoFilterButtons = document.getElementsByClassName('btn-todo-filter')
    let todoInput = document.getElementsByClassName('todo-input')[0]


    todoInput.addEventListener('keypress', todoInputKeyPressed)
    for (let i = 0; i < todoItemsButtons.length; i++) todoItemsButtons[i].addEventListener('click', todoItemClicked)
    for (let i = 0; i < todoFilterButtons.length; i++) todoFilterButtons[i].addEventListener('click', todoFilterButtonClicked)
}

function todoItemClicked(event) {
    let element = event.target;
    let todoTextElement = element.nextElementSibling
    toggle(element, 'active')
    toggleCrossText(todoTextElement)
}

function todoFilterButtonClicked(event) {
    let element = event.target
    let todoFilterButtons = document.getElementsByClassName('btn-todo-filter')
    let todoFooter = document.getElementsByClassName('todo-footer')[0]
    for (let i = 0; i < todoFilterButtons.length; i++) todoFilterButtons[i].classList.remove('active')
    let footerDuplicateElement = todoFooter.getElementsByClassName(element.classList.value)[0]
    element.classList.add('active')
    footerDuplicateElement.classList.add('active')
}

function todoInputKeyPressed(event) {
    if(event.keyCode != 13) return
    if(event.target.value) {
        addToDoItem(event.target.value)
        alert('To-do item added')
        event.target.value = ''
    }
    else alert('Input cannot be null')


}

function addToDoItem(textItem) {
    let todoList = document.getElementsByClassName('todo-list')[0]
    let todoItem = createToDoItem(textItem)

    todoList.innerHTML += todoItem;

}

function createToDoItem(textItem) {
    let todoItem = 
    `
        <div class="todo-item">
            <div class="item-description">
            <button class="btn btn-toggle-item" type="button"></button>
            <span class="todo">${textItem}</span>
            </div>
            <img src="images/icon-cross.svg" alt="" class="btn btn-delete-item">
        </div>
    `

    return todoItem;
}

function toggle(element, toggleClass){
    if(element.classList.contains(toggleClass)) element.classList.remove(toggleClass)
    else element.classList.add(toggleClass);
}

function toggleCrossText(element) {
    if(element.style.textDecoration === 'line-through') element.style.textDecoration = 'initial'
    else element.style.textDecoration = 'line-through'
}