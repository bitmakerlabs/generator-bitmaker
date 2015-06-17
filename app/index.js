'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var faker = require('faker');


var BitmakerPrototypingGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.appname = [faker.internet.domainWord(), faker.internet.domainWord(), faker.random.number(9999)].join('-');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Bitmaker generator! Let\'s get your project setup, shall we?'));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Tell me the name of your project (or I\'ll name it ' + this.appname + ')'
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'What extra tools would you like to add?',
      choices: [{
        name: 'Sass',
        value: 'includeSass',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      }]
    }, {
      when: function(answers) {
        return answers.features.indexOf('includeSass') !== -1;
      },
      type: 'confirm',
      name: 'includeBourbon',
      message: "Since you're using Sass, do you want to add Bourbon and Neat?",
      default: true
    }, {
      when: function(answers) {
        return !answers.includeBourbon;
      },
      type: 'confirm',
      name: 'includeBootstrap',
      message: "Do you want to add Bootstrap to this project?",
      default: false
    }, {
      type: 'input',
      name: 'includeBuildControl',
      message: chalk.bold('Do you have a GitHub repo for this project?') +
                '\n    Paste it in here to make deploying your prototype a snap (type: ' +
                chalk.inverse('grunt buildcontrol:pages') +
                ').\n    NOTE: Your URL must start with ' + chalk.bold('git@github.com') + ' for this to work!' +
                '\n\n    If you haven\'t set one up yet, don\'t worry, you can do it later.\n    Simply find and replace ' +
                chalk.bold('\'!!! PASTE YOUR GITHUB REPO URL HERE\'') +
                ' in the generated ' + chalk.bold('Gruntfile.js'),
      validate: function(input) {
        if ( input && !/^git@github.com/.test(input) ) {
          return 'Your GitHub repo URL must start with ' + chalk.bold('git@github.com');
        }

        return true;
      }
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      this.appname = answers.projectName || this.appname;

      this.userOptions = {
        pkg: this.pkg,
        appname: this.appname,
        appFolder: faker.helpers.slugify(this.appname).toLowerCase(),
        includeSass: hasFeature('includeSass'),
        includeModernizr: hasFeature('includeModernizr'),
        includeBourbon: answers.includeBourbon,
        includeBootstrap: answers.includeBootstrap,
        includeBuildControl: answers.includeBuildControl
      }

      done();
    }.bind(this));
  },

  writing: {
    base: function() {
      this.destinationRoot( this.userOptions.appFolder );
    },

    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.userOptions
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this.userOptions
      );

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        this.userOptions
      );

      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js')
      );
    },

    gruntfile: function() {
      this.fs.copyTpl(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
        this.userOptions
      );
    },

    projectfiles: function () {
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
      this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'));
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this.userOptions
      );
    },

    mainStylesheet: function() {
      var css = 'main.' + (this.userOptions.includeSass ? 's' : '') + 'css';

      this.fs.copyTpl(
        this.templatePath('main.css'),
        this.destinationPath('app/styles/' + css),
        this.userOptions
      );
    }
  },

  end: function() {
    this.installDependencies({
      callback: function() {
        this.log('\n\n' + chalk.bold('ALL DONE!') + '\nNow switch into ' + chalk.bold(this.userOptions.appFolder) + ' (cd ' + this.userOptions.appFolder + ') and run ' + chalk.bold('grunt') + '.');
      }.bind(this)
    });
  }
});

module.exports = BitmakerPrototypingGenerator;
