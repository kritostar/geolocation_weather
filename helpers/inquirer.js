
require('colors');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1'.green } Search city`
            },
            {
                value: 2,
                name: `${ '2.'.green } History`
            },
            {
                value: 0,
                name: `${ '0.'.green } Exit\n `
            }          
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();
    console.log('======================'.green);
    console.log('Select an option'.white);
    console.log('======================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue\n`
        } 
    ]

    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Please insert a value';
                }
                return true;
            }
        }
    ];

    const {desc}= await inquirer.prompt(question);
    return desc;

}

const listPlaces = async ( places = [] ) =>{
    
    const choices = places.map((place, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: place.id,
            name: `${idx} ${place.name}`,
        }
    });

    choices.unshift(
        {
            value: '0',
            name: '0.'.green + 'Cancel'

        }
    );
    
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select: ',
            choices
        }
    ]
    const { id } = await inquirer.prompt(questions);

    return id;

}

const listTasksComplete = async ( tasks = [] ) =>{
    
    const choices = tasks.map((task, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedAt)
            ? true
            : false
        }
    });

    
    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(questions);

    return ids;

}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;

}

module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    listPlaces,
    listTasksComplete,
    confirm

}