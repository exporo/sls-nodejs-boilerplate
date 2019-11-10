var inquirer = require('inquirer');


var baseQuestions = [
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
        message: 'The name of the field like: ',
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

    var run = true;
    while (run) {
        var result = addField();
        console.log(result);
        run = false;

        var field = inquirer.prompt(fieldQuestions);
        fields.push(field);
    }
});


async function addField() {
    var field = await inquirer.prompt(addFieldQuestion);
    return field;
}

