'use strict';

const Generator = require('yeoman-generator');

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

    async writing() {
        const componentName = this.options['component-name'];
        const isStyled = this.options['is-styled'];
        const hasProps = this.options['has-props'];
        const shouldCreateFolder = this.options['create-folder'];

        this.fs.copyTpl(
            this.templatePath('index.ejs'),
            this.destinationPath(shouldCreateFolder ? `${componentName}/index.ts` : "index.ts"),
            { componentName: componentName }
        );

        this.fs.copyTpl(
            this.templatePath('component.ejs'),
            this.destinationPath(shouldCreateFolder ? `${componentName}/${componentName}.tsx` : `${componentName}.tsx`),
            { componentName: componentName, isStyled: isStyled, hasProps: hasProps }
        );

        // Create styled file.
        if (isStyled) {
            this.fs.copyTpl(
                this.templatePath('styled-component.ejs'),
                this.destinationPath(shouldCreateFolder ? `${componentName}/${componentName}.styles.tsx` : `${componentName}.styles.tsx`),
                { componentName: componentName }
            );
        }
    }

    install() {
        this.log('Done');
    }
};

