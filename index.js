const inquirer = require('inquirer');
const prompts = require('./lib/prompts');

function promptAction(){
    inquirer.prompt(prompts.actionPrompt)
    .then(response => {
        
    })
}

