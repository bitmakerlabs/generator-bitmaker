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
      this.appFolder = faker.helpers.slugify(this.appname).toLowerCase();
      this.includeSass = hasFeature('includeSass');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeBourbon = answers.includeBourbon;
      this.includeBootstrap = answers.includeBootstrap;
      this.includeBuildControl = answers.includeBuildControl;

      done();
    }.bind(this));
  },

  writing: {
    base: function() {
      this.dest.mkdir( this.appFolder );
      this.destinationRoot( this.appFolder );
    },

    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/styles');
      this.dest.mkdir('app/scripts');
      this.dest.mkdir('app/images');

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');

      this.template('index.html', 'app/index.html');
      this.src.copy('main.js', 'app/scripts/main.js');
    },

    gruntfile: function() {
      this.template('Gruntfile.js');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('gitignore', '.gitignore');
      this.template('README.md', 'README.md');
    },

    mainStylesheet: function() {
      var css = 'main.' + (this.includeSass ? 's' : '') + 'css';
      this.template('main.css', 'app/styles/' + css);
    }
  },

  end: function() {
    this.installDependencies({
      callback: function() {
        this.log('\n\n' + chalk.bold('ALL DONE!') + '\nNow switch into ' + chalk.bold(this.appFolder) + ' (cd ' + this.appFolder + ') and run ' + chalk.bold('grunt') + '.');
      }.bind(this)
    });
  }
});

module.exports = BitmakerPrototypingGenerator;
