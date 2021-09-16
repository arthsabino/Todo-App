if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    let todoInput = document.getElementsByClassName('todo-input')[0]
    let btnClearCompleted = document.getElementsByClassName('btn-clear-completed')[0]
    let btnToggleTheme = document.getElementsByClassName('btn-toggle-theme')[0]

    btnClearCompleted.addEventListener('click', clearCompletedClicked)
    btnToggleTheme.addEventListener('click', btnToggleThemeClicked)
    todoInput.addEventListener('keypress', todoInputKeyPressed)
    todoItemsButtonsAddClickEventListener()
    todoFilterButtonsAddClickEventListener()
    toggleTheme()
}

function todoItemsButtonsAddClickEventListener() {
    todoItemsButtonsDoneAddClickEventListener()
    todoItemsRemoveButtonsAddClickEventListener()
}

function todoItemsButtonsDoneAddClickEventListener() {
    let todoList = document.getElementsByClassName('todo-list')[0]
    let todoItemsButtons = todoList.getElementsByClassName('btn-toggle-item')
    for (let i = 0; i < todoItemsButtons.length; i++) todoItemsButtons[i].addEventListener('click', todoItemClicked)
}

function todoItemsRemoveButtonsAddClickEventListener() {
    let todoList = document.getElementsByClassName('todo-list')[0]
    let todoItemsButtons = todoList.getElementsByClassName('btn-delete-item')
    for (let i = 0; i < todoItemsButtons.length; i++) todoItemsButtons[i].addEventListener('click', removeButtonClicked)
}

function todoFilterButtonsAddClickEventListener(){
    let todoFilterButtons = document.getElementsByClassName('btn-todo-filter')
    for (let i = 0; i < todoFilterButtons.length; i++) todoFilterButtons[i].addEventListener('click', todoFilterButtonClicked)

}

function btnToggleThemeClicked(event) {
    setTheme()
}

function removeButtonClicked (event){
    let element = event.target
    let todoItem = element.closest('.todo-item')
    deleteToDoItem(todoItem)
}

function todoItemClicked(event) {
    let element = event.target;
    let todoTextElement = element.nextElementSibling
    let todoItemParentElement = element.closest('.todo-item')
    toggle(todoItemParentElement, 'done');
    toggle(element, 'done');
    toggleCrossText(todoTextElement)
}

function clearCompletedClicked(event) {
    clearCompleted()
}

function todoFilterButtonClicked(event) {
    let element = event.target
    let todoFilterButtons = document.getElementsByClassName('btn-todo-filter')
    let todoFooter = document.getElementsByClassName('todo-footer')[0]
    for (let i = 0; i < todoFilterButtons.length; i++) todoFilterButtons[i].classList.remove('active')
    let footerDuplicateElement = todoFooter.getElementsByClassName(element.classList.value)[0]
    element.classList.add('active')
    footerDuplicateElement.classList.add('active')
    filterItems(element.dataset.filter)
}

function filterItems(status) {
    let todoList = document.getElementsByClassName('todo-list')[0]
    let todoItems = todoList.getElementsByClassName('todo-item')
    for (let i = 0; i < todoItems.length; i++) {
        if(status == 'all') todoItems[i].style.display = 'flex';
        else if(status == 'active') todoItems[i].style.display = (todoItems[i].classList.contains('done')) ? 'none' : 'flex';
        else if(status == 'completed') todoItems[i].style.display = (todoItems[i].classList.contains('done')) ? 'flex' : 'none';
    }
}

function clearCompleted() {
    let todoList = document.getElementsByClassName('todo-list')[0]
    let todoItems = todoList.querySelectorAll('.todo-item')
    for (let i = 0; i < todoItems.length; i++) if(todoItems[i].classList.contains('done')) deleteToDoItem(todoItems[i])
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
    todoItemsButtonsAddClickEventListener()
    updateCount()
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

function deleteToDoItem(item) {
    item.remove()
    updateCount()
}

function updateCount() {
    let todoList = document.getElementsByClassName('todo-list')[0]
    let todoItems = todoList.getElementsByClassName('todo-item')
    let itemsLeft = document.getElementsByClassName('items-left')[0]
    itemsLeft.innerText = `${todoItems.length} items left`;
}

function toggle(element, toggleClass){
    if(element.classList.contains(toggleClass)) element.classList.remove(toggleClass)
    else element.classList.add(toggleClass);
}

function toggleCrossText(element) {
    if(element.style.textDecoration === 'line-through') element.style.textDecoration = 'initial'
    else element.style.textDecoration = 'line-through'
}

function setTheme() {
    themeName = (document.documentElement.className == 'theme-dark') ? 'theme-light' : 'theme-dark'
    document.documentElement.className = themeName
    localStorage.setItem('theme', themeName);
    let btnToggleTheme = document.getElementsByClassName('btn-toggle-theme')[0]
    btnToggleTheme.src = (document.documentElement.className == 'theme-dark') ? 'images/icon-sun.svg' : 'images/icon-moon.svg'
}

function toggleTheme() {
    
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
}