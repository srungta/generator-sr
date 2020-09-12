'use strict';

const Generator = require('yeoman-generator');
module.exports = class extends Generator {
    install() {
        this.log('\nSupported actions : rcomp');
    }
};
