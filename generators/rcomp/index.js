'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');

function ErrorCallBack(err) {
    if (err) {
        console.log(err);
    }
}

function GetMainFileContent(componentName, isStyled, hasProps) {
    // Add headers
    let content = "import React from 'react';\n";
    if (isStyled) {
        content += `import { ${componentName}Container } from './${componentName}.styles';\n`;
    }
    content += `\n`;

    // Add props
    if (hasProps) {
        content += "interface Props {\n";
        content += "\tpropName:string;\n";
        content += "}\n";
    }
    content += `\n`;

    // Add component
    content += `const ${componentName}: React.FC${hasProps ? '<Props>' : ''}  = ( ${hasProps ? '{ propName }' : ''} ) => {\n`;
    content += `\treturn (\n`;
    content += `\t\t${isStyled ? `<${componentName}Container>` : '<div>'}\n`;
    content += `\t\t\tHi\n`;
    content += `\t\t${isStyled ? `</${componentName}Container>` : '</div>'}\n`;
    content += `\t)\n`;
    content += `};\n`;

    content += `\n`;

    // Export component
    content += `export { ${componentName} };`
    content += `\n`;

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

        this.option('is-styled', {
            description: "Create a styled file as well",
            alias: "s",
            type: Boolean
        });
        this.option('has-props', {
            description: "Does component have props?",
            alias: "p",
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
        const isStyled = this.options['is-styled'];
        const hasProps = this.options['has-props'];
        const shouldCreateFolder = this.options['create-folder'];

        // create folder if required.
        if (shouldCreateFolder) {

        }

        // Create main file.
        fs.writeFile(
            componentName + ".tsx",
            GetMainFileContent(componentName, isStyled, hasProps),
            ErrorCallBack)

        // Create index file.
        fs.writeFile(
            "index.ts",
            GetIndexFileContent(componentName),
            ErrorCallBack)

        // Create styled file.
        if (isStyled) {
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
