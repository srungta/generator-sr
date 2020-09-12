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
        this.argument("component-name", { required: true })
        this.option('styled', {
            description: "Create a styled file as well",
            alias: "s",
            type: Boolean
        });
        this.option('create-folder', {
            description: "Create the files in a folder",
            alias: "f",
            type: Boolean
        });
    }

    writing() {
        fs.writeFile(this.options['component-name'] + ".tsx", "", callbackFunction)
        fs.writeFile("index.ts", "", callbackFunction)
        if (this.options.styled) {
            fs.writeFile(this.options['component-name'] + ".styles.tsx", "", callbackFunction)
        }
    }

    install() {
        this.log('\nDone');
    }
};
