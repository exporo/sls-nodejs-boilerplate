const inquirer = require('inquirer');


const baseQuestions = [
    {
        type: 'input',
        name: 'namespace',
        message: 'The namespace (folder name) inside ./application/domain like "User":',
    },
    {
        type: 'input',
        name: 'name',
        message: 'The name of your CURD-Controller like "UserItem":',
    },
    {
        type: 'input',
        name: 'path',
        message: 'The base path of rCURD-Controller like "/user/:parentId/item":',
    }

];

const addFieldQuestion = [
    {
        type: 'confirm',
        name: 'addFIelds',
        message: 'Do u want to add a field: ',
    }
];

const fieldQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'The name of the field like: ',
    },
    {
        type: 'rawlist',
        name: 'fieldType',
        message: 'The field type: ',
        choices: ['string', 'integer', 'float', 'foreignKey']
    },
];

inquirer.prompt(baseQuestions).then(async base => {
    let fields = [];

    let result = await addField();
    console.log(result);

    let field = await inquirer.prompt(fieldQuestions);
    console.log(field);
    fields.push(field);
});


async function addField() {
    var field = await inquirer.prompt(addFieldQuestion);
    return field;
}

