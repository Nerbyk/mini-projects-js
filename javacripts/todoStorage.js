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
}

export default TodoStorage