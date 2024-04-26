import figlet from 'figlet';
import { actionPrompt } from './lib/prompts.js';

console.log("".padEnd(80, "-"));

await figlet("Employee CMS", { font: "Big Money-nw", width: 80, whitespaceBreak: true }, (err, data) => {
    console.log(data);
})
console.log("".padEnd(80, "-"));

// prompts.actionPrompt();