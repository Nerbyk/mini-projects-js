const createForm = document.createElement('FORM')

function todosElement() {
    return document.getElementById("todos")
}




function generateItems(itemText, isChecked = false) {
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

function addItem(form) {
    let newItem = document.createElement('FORM')
    let todos = todosElement()

    newItem.name = "newItem"
    todos.appendChild(newItem)

    let [text, checkbox] = generateItems(form.value)

    newItem.appendChild(text)
    newItem.appendChild(checkbox)

    form.value = ""
    form.focus()

    itemId = toStore(text.value, checkbox.checked)
    newItem.setAttribute("id", "todoId-" + itemId)

    console.log(todosElement().innerHTML)


}

function invokeGeneration() {
    let form = document.forms["addItem"]["itemText"]
    if (form.value != "") addItem(form);
}



function crossOut(element) {
    let textArea = element.previousSibling
    if (!element.checked) {
        textArea.setAttribute("class", "form todo-item")
    } else {
        textArea.setAttribute("class", "form todo-item crossed-out")
    }
}

function deleteList() {
    todosElement().childNodes.forEach(node => node.innerHTML = "")
}