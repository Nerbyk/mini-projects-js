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

    allTodos() {
        console.log(this.todos)
    }
}

module.exports = TodoStorage;