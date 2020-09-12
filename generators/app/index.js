'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');
const chalk = require('chalk');
const yosay = require('yosay');

function callbackFunction(err) {
    if (err) {
        console.log(err);
    }
}
module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.option('comp');
        console.log(args);
        console.log(opts);
    }
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'componentname',
                message: 'Component name',
                required: true
            },
            {
                type: 'input',
                name: 'generateStyledComponentFile',
                message: 'Generate styled component file?',
                default: true
            }
        ]);
    }

    writing() {
        fs.writeFile(this.answers.componentname + ".tsx", "", callbackFunction)
        fs.writeFile("index.ts", "", callbackFunction)
        if (this.answers.generateStyledComponentFile) {
            fs.writeFile(this.answers.componentname + ".styles.tsx", "", callbackFunction)
        }
    }

    install() {
        this.log('\nDone');
    }
};
