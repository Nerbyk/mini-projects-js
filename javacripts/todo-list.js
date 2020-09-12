const createForm = document.createElement('FORM')
const todosElement = document.getElementById("todos")

import TodoStorage from './todoStorage.js';
const storage = new TodoStorage

function generateItems(itemText, isChecked) {

    let text = document.createElement("input")
    let checkbox = document.createElement("input")

    text.type = "text"
    text.class = "form"
    text.disabled = "true"
    text.value = itemText
    text.setAttribute("class", 'form todo-item')

    checkbox.type = "checkbox"
    checkbox.checked = isChecked
    checkbox.setAttribute("onclick", "crossOut(this);")
    checkbox.setAttribute("class", 'form todo-checkbox')

    return [text, checkbox]
}


function addItem(todoText, status = false) {

    let newItem = document.createElement('FORM')

    newItem.name = "newItem"
    todosElement.appendChild(newItem)

    let [text, checkbox] = generateItems(todoText, status)

    newItem.appendChild(text)
    newItem.appendChild(checkbox)

    storage.newTodo(text.value, checkbox.checked)
    storage.toStorage()

    newItem.setAttribute("id", storage.id)

}

function invokeGeneration() {
    let form = document.forms["addItem"]["itemText"]
    if (form.value != "") {
        addItem(form.value);
        form.value = ""
        form.focus()
    }
}

function crossOut(element) {
    let textArea = element.previousSibling
    let todoId = element.parentElement.id

    if (!element.checked) {
        textArea.setAttribute("class", "form todo-item")
    } else {
        textArea.setAttribute("class", "form todo-item crossed-out")
    }

    storage.changeStatusOf(todoId)
    storage.toStorage()
}

function deleteList() {
    todosElement.childNodes.forEach(node => node.innerHTML = "")
    storage.empty()
}

function expandData(data) {
    data.forEach(element => addItem(element.value, element.status))
}

const storageData = storage.fromStorage()
expandData(storageData)