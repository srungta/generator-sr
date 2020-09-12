var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('comp'); // This method adds support for a creating a new component flag
  }
  method1() {
    this.log('method 1 just ran');
  }

  asyncTask() {
    var done = this.async();

    getUserEmail(function (err, name) {
      done(err);
    });
  }
};