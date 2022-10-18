'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');
module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.argument("element-name", { required: true })

        this.option('has-models', {
            description: "Create a models file as well",
            alias: "m",
            type: Boolean
        });
        this.option('has-telemetry', {
            description: "Create a telemetry file as well",
            alias: "t",
            type: Boolean
        });
    }
    getComponentClassNameFromElementName(componentName) {
        const pieces = componentName.split("-");
        let final = [];
        for (let index = 0; index < pieces.length; index++) {
            const word = pieces[index];
            final.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
        return final.join('');
    }

    async writing() {
        const elementName = this.options['element-name'];
        const componentName = this.getComponentClassNameFromElementName(elementName);
        const folderName = elementName;
        const hasModels = this.options['has-models'];
        const hasTelemetry = this.options['has-telemetry'];
        const shouldCreateFolder = true;

        this.fs.copyTpl(
            this.templatePath('index.ejs'),
            this.destinationPath(shouldCreateFolder ? `${folderName}/index.ts` : "index.ts"),
            { componentClassName: componentName, componentElementName: elementName }
        );

        this.fs.copyTpl(
            this.templatePath('component.ejs'),
            this.destinationPath(shouldCreateFolder ? `${folderName}/${componentName}.ts` : `${componentName}.ts`),
            { componentClassName: componentName, componentElementName: elementName }
        );

        this.fs.copyTpl(
            this.templatePath('styles.ejs'),
            this.destinationPath(shouldCreateFolder ? `${folderName}/${componentName}.styles.ts` : `${componentName}.styles.ts`),
            { componentClassName: componentName, componentElementName: elementName }
        );

        this.fs.copyTpl(
            this.templatePath('template.ejs'),
            this.destinationPath(shouldCreateFolder ? `${folderName}/${componentName}.template.ts` : `${componentName}.template.ts`),
            { componentClassName: componentName, componentElementName: elementName }
        );

        if (hasModels) {
            this.fs.copyTpl(
                this.templatePath('models.ejs'),
                this.destinationPath(shouldCreateFolder ? `${folderName}/${componentName}.models.ts` : `${componentName}.models.ts`),
                { componentClassName: componentName, componentElementName: elementName }
            );
        }

        if (hasTelemetry) {
            this.fs.copyTpl(
                this.templatePath('telemetry.ejs'),
                this.destinationPath(shouldCreateFolder ? `${folderName}/${componentName}.telemetry.ts` : `${componentName}.telemetry.ts`),
                { componentClassName: componentName, componentElementName: elementName }
            );
        }

    }

    install() {
        const elementName = this.options['element-name'];

        if (fs.existsSync(`${elementName}/.yo-repository`)) {
            fs.rmdir(`${elementName}/.yo-repository`, {}, function (error) {
                if (error) { console.log(error); }
            });
        }
        if (fs.existsSync(`.yo-repository`)) {
            fs.rmdir(`.yo-repository`, {}, function (error) {
                if (error) { console.log(error); }
            });
        }
        this.log('Done');
    }
};

