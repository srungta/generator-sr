'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');
const chalk = require('chalk');
const yosay = require('yosay');

function ErrorCallBack(err) {
    if (err) {
        console.log(err);
    }
}

function GetMainFileContent(componentName, styled) {
    let content = "import React from 'react';\n";
    if (styled) {
        content += `import { ${componentName}Container } from './${componentName}.styles';\n`;
    }
    return content;
}
function GetStyledFileContent(componentName) {
    let content = "import styled from 'styled-components';\n";
    content += `\n`;
    content += `const ${componentName}Container = styled.div\`\n`;
    content += `\`;\n`;
    content += `\n`;
    content += `export { ${componentName}Container };\n`;
    return content;
}
function GetIndexFileContent(componentName) {
    let content = `export { ${componentName} } from './${componentName}';\n`;
    return content;
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
        const componentName = this.options['component-name'];
        fs.writeFile(
            componentName + ".tsx",
            GetMainFileContent(componentName, this.options.styled),
            ErrorCallBack)
        fs.writeFile(
            "index.ts",
            GetIndexFileContent(componentName),
            ErrorCallBack)
        if (this.options.styled) {
            fs.writeFile(
                componentName + ".styles.tsx",
                GetStyledFileContent(componentName),
                ErrorCallBack)
        }
    }

    install() {
        this.log('Done');
    }
};
