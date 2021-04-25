const inquirer = require("inquirer");
const colors = require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      { value: 1, name: `${"1.".green} Crear tarea` },
      { value: 2, name: `${"2.".green} Listar tareas` },
      { value: 3, name: `${"3.".green} Listar tareas completadas` },
      { value: 4, name: `${"4.".green} Listar tareas pendientes` },
      { value: 5, name: `${"5.".green} Completar tarea(s)` },
      { value: 6, name: `${"6.".green} Borrar tarea` },
      { value: 0, name: `${"0.".green} Salir` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("  Seleccione una opción".white);
  console.log("==========================".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const stop = async () => {
  console.log("\n");
  return await inquirer.prompt([
    {
      value: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) return "Por favor, ingrese un valor";
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTaskToDelete = async (tasks = []) => {
  const choices = tasks.map(({ id, desc }, i) => {
    const idx = `${++i}.`.green;
    return {
      value: id,
      name: `${idx} ${desc}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${"0.".green} Cancelar`,
  });

  const question = [
    {
      type: "list",
      name: "id",
      message: "¿Cual desea borrar?",
      choices,
    },
  ];
  return await inquirer.prompt(question);
};

const confirmChoice = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "YesOrNo",
      message,
    },
  ];

  const { YesOrNo } = await inquirer.prompt(question);
  return YesOrNo;
};

const listTaskToComplete = async (tasks = []) => {
  const choices = tasks.map(({ id, desc, completedAt }, i) => {
    const idx = `${++i}.`.green;
    return {
      value: id,
      name: `${idx} ${desc}`,
      checked: completedAt ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  return await inquirer.prompt(question);
};

module.exports = {
  inquirerMenu,
  stop,
  readInput,
  listTaskToDelete,
  confirmChoice,
  listTaskToComplete,
};
