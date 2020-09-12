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
        return localStorage.getItem('todos')
    }
}


const storage = new TodoStorage

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

    newItem.name = "newItem"
    todosElement.appendChild(newItem)

    let [text, checkbox] = generateItems(form.value)

    newItem.appendChild(text)
    newItem.appendChild(checkbox)

    storage.newTodo(text.value, checkbox.checked)

    form.value = ""
    form.focus()


    newItem.setAttribute("id", storage.id)

}

function invokeGeneration() {
    let form = document.forms["addItem"]["itemText"]
    if (form.value != "") addItem(form);
}

function crossOut(element) {
    let textArea = element.previousSibling
    let todoId = element.parentElement.id
    storage.changeStatusOf(todoId)
    if (!element.checked) {
        textArea.setAttribute("class", "form todo-item")

    } else {
        textArea.setAttribute("class", "form todo-item crossed-out")
    }
    storage.toStorage()

}

function deleteList() {
    todosElement.childNodes.forEach(node => node.innerHTML = "")
}

console.log(storage.fromStorage())
    // TODO: Generate Node from storage.fromStorage and append it to div todos