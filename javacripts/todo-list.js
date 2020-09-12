const createForm = document.createElement('FORM')
const todosElement = document.getElementById("todos")

class TodoStorage {
    constructor() {
        this.todos = []
        this.id = 0
    }
    newTodo(value, status) {
        this.id++;
        let todoObj = { id: this.id, value: value, status: status };
        this.todos.push(todoObj);
    }

    changeStatusOf(id) {
        let elementIndex = this.todos.findIndex(element => element.id == id)
        let cloneTodos = [...this.todos]
        cloneTodos[elementIndex] = {...cloneTodos[elementIndex],
            status: !cloneTodos[elementIndex].status
        }
        this.todos = cloneTodos
    }

    toStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    fromStorage() {
        let storedData = localStorage.getItem('todos')
        return JSON.parse(storedData)
    }

    empty() {
        localStorage.clear();
    }
}
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