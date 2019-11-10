var inquirer = require('inquirer');


var baseQuestions = [
    {
        type: 'input',
        name: 'namespace',
        message: 'The namespace (folder name) inside ./application/domain:',
    },
    {
        type: 'input',
        name: 'name',
        message: 'The name of your CURD-Controller:',
    }
];

var addFieldQuestion = [
    {
        type: 'confirm',
        name: 'addFIelds',
        message: 'Do u want to add a field: ',
    }
];

var fieldQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'The name of the field: ',
    },
    {
        type: 'rawlist',
        name: 'fieldType',
        message: 'The field type: ',
        choices: ['string', 'integer', 'float', 'foreignKey']
    },
];

inquirer.prompt(baseQuestions).then(base => {
    var fields = [];

    while (addField()) {
        var field = inquirer.prompt(fieldQuestions);
        fields.push(field);
    }
});


async function addField() {
    var field = await inquirer.prompt(addFieldQuestion);
    return field;
}

