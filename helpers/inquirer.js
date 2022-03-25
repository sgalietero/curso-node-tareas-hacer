const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices: [{
            value: '1',
            name: `${'1.'.green} Crear tarea`
        },{
            value: '2',
            name: `${'2.'.green} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar tarea`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        }]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('============================='.green);
    console.log('    Seleccione una opcion    '.white);
    console.log('=============================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() => {
    const question = [
        {
            type:'input',
            name:'enter',
            message:`\nPresione ${'ENTER'.green} para continuar\n`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async(message) => {

    const question = [{
        type:'input',
        name:'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = [])  => {
    const choices = tareas.map( (tarea, idx) => {

        const i = `${idx+1}`.green;

        return {
            value: tarea.id,
            name: `${i} ${tarea.desc}`
        }
    });
    
    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    });

    const preguntas = [{
        type:'list',
        name:'id',
        message:'Introduzca el ID a eliminar',
        choices
    }];
    const {id} = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async (mensaje) => {
    const preguntas = [{
        type:'confirm',
        name:'ok',
        message: mensaje
    }];

    const {ok} = await inquirer.prompt(preguntas);
    return ok;
}

const mostrarListadoChecklist = async(tareas = [])  => {
    const choices = tareas.map( (tarea, idx) => {

        const i = `${idx+1}`.green;

        return {
            value: tarea.id,
            name: `${i} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true :false
        }
    });

    const preguntas = [{
        type:'checkbox',
        name:'ids',
        message:'Seleccione las tareas a completar',
        choices
    }];
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
