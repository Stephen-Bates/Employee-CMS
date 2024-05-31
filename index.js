import figlet from 'figlet';
import { actionPrompt } from './lib/prompts.js';

console.log(
    figlet.textSync("Employee CMS", {
        font: "Big Money-nw",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true
    })
);

actionPrompt();