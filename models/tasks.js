const Task = require("./task");
require("colors");
class Tasks {
  _list = {};

  get listTasksArr() {
    return Object.keys(this._list).map((key) => this._list[key]);
  }

  constructor() {
    this._list = {};
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  listAllTasks() {
    console.log();
    this.listTasksArr.forEach(({ desc, completedAt }, i) => {
      const idx = `${++i}.`.green;
      const status = completedAt ? "Completada".green : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${status}`);
    });
  }

  listTaskByStatus(status = true) {
    console.log();
    this.listTasksArr
      .filter(({ completedAt }) => {
        if (status) return completedAt;
        if (!status) return completedAt === null;
      })
      .forEach(({ desc, completedAt }, i) => {
        const idx = `${++i}.`.green;
        const status = completedAt ? completedAt.green : "Pendiente".red;
        console.log(`${idx} ${desc} :: ${status}`);
      });
  }

  toggleComplete(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) task.completedAt = new Date().toISOString();
    });

    this.listTasksArr
      .filter(({ id }) => !ids.includes(id))
      .forEach(({ id }) => (this._list[id].completedAt = null));
  }
}

module.exports = Tasks;
