require("colors");

const {
  inquirerMenu,
  stop,
  readInput,
  listTaskToComplete,
  listTaskToDelete,
  confirmChoice,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/save-data");
const Tasks = require("./models/tasks");

const main = async () => {
  let option_id = 0;
  const tasks = new Tasks();

  const tasksArr = await readDB();

  if (tasksArr) {
    tasks.loadTasksFromArray(tasksArr);
  }

  do {
    // Imprimir Menu
    option_id = await inquirerMenu();

    switch (option_id) {
      case 1: // Agregar tarea
        const nameTask = await readInput("Descripción: ");
        tasks.createTask(nameTask);
        break;
      case 2: // listar todas las tareas
        tasks.listAllTasks();
        break;
      case 3: // listar tareas completadas
        tasks.listTaskByStatus(true);
        break;
      case 4: // listar tareas pendientes
        tasks.listTaskByStatus(false);
        break;
      case 5: // marcar tareas completadas
        const { ids } = await listTaskToComplete(tasks.listTasksArr);
        tasks.toggleComplete(ids);
        break;
      case 6: // borrar tareas
        const { id } = await listTaskToDelete(tasks.listTasksArr);

        if (id) {
          if (await confirmChoice("¿Está seguro?")) {
            tasks.deleteTask(id);
            console.log(`Tarea borrada`.green);
          }
        }
        break;
      case 0: // salir
        console.log(`Hasta luego`.green);
        break;
    }

    saveDB(tasks.listTasksArr);

    await stop();
  } while (option_id !== 0);
};

main();
