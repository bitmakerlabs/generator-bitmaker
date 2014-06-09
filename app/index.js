'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BitmakerPrototypingGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Bitmaker generator! Let\'s get your project setup, shall we?'));

    var prompts = [{
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
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      this.includeSass = hasFeature('includeSass');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeBourbon = answers.includeBourbon;
      this.includeBootstrap = answers.includeBootstrap;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/styles');
    this.mkdir('app/scripts');
    this.mkdir('app/images');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');

    this.copy('index.html', 'app/index.html');
    this.copy('main.js', 'app/scripts/main.js');
  },

  gruntfile: function() {
    this.template('Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
  },

  mainStylesheet: function() {
    var css = 'main.' + (this.includeSass ? 's' : '') + 'css';
    this.copy('main.css', 'app/styles/' + css);
  },

  install: function() {
    if (this.options['skip-install']) {
      return;
    }

    var done = this.async();
    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install'],
      callback: done
    });
  }
});

module.exports = BitmakerPrototypingGenerator;
