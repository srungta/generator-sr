'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');
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
        this.option('add-to-root-index', {
            description: "Adds the export to the root index if a new folder is created. Creates the root index if not present.",
            alias: "i",
            type: Boolean
        });
    }

    async writing() {
        const componentName = this.options['component-name'];
        const isStyled = this.options['is-styled'];
        const hasProps = this.options['has-props'];
        const shouldCreateFolder = this.options['create-folder'];
        const shouldAddToRootIndex = this.options['add-to-root-index'] && shouldCreateFolder;

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

        if (shouldAddToRootIndex) {
            const pathToRootIndex = `index.ts`;
            const buffer = new Buffer.from(`\nexport { ${componentName} } from './${componentName}';`);
            fs.open(pathToRootIndex, 'a', function (err, fd) {
                // If the output file does not exists 
                // an error is thrown else data in the 
                // buffer is written to the output file 
                if (err) {
                    console.log('Cant open root index.ts');
                } else {
                    fs.write(fd, buffer, 0, buffer.length, null, function (err, writtenbytes) {
                        if (err) {
                            console.log('Cant write to root index.ts file');
                        } else {
                            console.log('Updated root index.ts file');
                        }
                    })
                }
            });
        }
    }

    install() {
        const componentName = this.options['component-name'];

        if (fs.existsSync(`${componentName}/.yo-repository`)) {
            fs.rmdir(`${componentName}/.yo-repository`, {}, function (error) {
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

