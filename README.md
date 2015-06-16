# Bitmaker Front-End Development Yeoman Generator

[Yeoman](http://yeoman.io) is a combination of three tools that will help you create new projects with everything you need to get working on your designs quickly. The three tools are Yo, a scaffolding tool that will setup project directories and files for you, [Grunt](http://gruntjs.com), a task runner, and [Bower](http://bower.io), a package manager that will fetch JavaScript and stylesheets from around the web for use in your project.

This generator will help you create a baseline project for your work in the course that will speed up your development time and help you deploy your code to the web.


## PRE-FLIGHT: THE COMMAND LINE INTERFACE

The command line interface is like the text-based version of Finder or Windows Explorer. It allows you to navigate your file system and run commands and programs by calling them by name rather than by clicking on icons. Before we get going with the course, if you're not familiar with using the command line interface of your operating system (as I'm sure most of you aren't), it'll be useful to learn the basics so that you'll feel more comfortable going forward with the course. This is one of the fundamental tools that developers use and some of the tools we'll be using in the course will require some basic familiarity with how it works. 

To get up to speed, [follow the tracks on this site](http://cli.learncodethehardway.org/book/), at least until you hit "Moving a file" (you can keep going if you want to learn more, obviously!). It shouldn't take too long and it'll be worth the investment.


## Setting Up

There are two ways to use this generator. Generally, to avoid esoteric setup issues, we'll be using a Vagrant box to run the generator, but you can also install this manually on your machine if you want.

### Vagrant Installation

We will be using this generator through a [Vagrant](http://vagrantup.com) box, which will have it pre-installed. The Vagrant box, along with setup instructions, can be found at the [fed-vagrant](https://github.com/bitmakerlabs/fed-vagrant) repository.


## Usage

Here are the final setup instructions for scaffolding out new projects. This is the workflow we'll be using from now on when developing with Sass. **We'll discuss this in class and do the following steps together, these instructions are just for future reference.**

### Any time you're creating a new project

0. **If using Vagrant**, you'll do the following steps to start your Vagrant box
  - `vagrant up`
  - `vagrant ssh`
  - `cd projects`
1. Run the Bitmaker generator by running `yo bitmaker`
2. Answer the questions it asks you and watch it go!
  - Give your project a cool name or the generator will pick one at random for you
  - Accepting the defaults is probably a good way to start
  - At the end it will have created a project folder using your project name (it'll turn spaces into dashes and make it all lowercase)
  - Once it's done, switch into that project directory (`cd <project-name>`) and run grunt to get to work!
3. Open that project directory in your editor of choice to take a look at what it created for you.

You'll find that all the files you need to edit are under an `app/` directory in your project folder. You can safely ignore the rest of the stuff for now, it's just supporting files that help make the magic happen.

Now that the project is setup, run the `grunt` command at the command line (inside your Vagrant box, if using it) to start up a server that will serve your page in a browser and watch for changes to your files. Whenever a file changes, the page in the browser will automatically reload.

---

### Manual Installation

**NOTE: It's much easier and more reliable to use the above Vagrant option!**

You can also install this generator manually on your computer. You'll need to first install [Git](http://git-scm.com) and [NodeJS](http://nodejs.org) on your machine. Here are instructions on doing that.

#### WINDOWS USERS

**You must be running at least Windows 7 for the software for this course to install properly**

1. Install [Git](http://git-scm.com/download/win)
  - On the second step **Adjusting your PATH Environment**, select the second option (Run Git from the Windows Command Prompt)
  - Accept defaults everywhere else
2. Install [GitHub for Windows](https://windows.github.com) [OPTIONAL]
  - Accept all of the default options
  - This is a nice companion to the command line, it will give you graphical interface to your Git repositories
2. Go to [http://nodejs.org](http://nodejs.org) and click the big Install button to download the Windows installer
3. Install NodeJS via the installer
  - Accept all of the default options
4. Go to your command line
  - On Windows, open the Command Line by typing `powershell` in the Run box of the Start Menu (you can open the Run box by pressing `WindowsKey+R`). This will only work if you're running Windows 7 or later.
5. Install [Visual Studio 2013 WD](http://www.visualstudio.com/downloads/download-visual-studio-vs#d-express-windows-desktop)
  - Because the generator depends on [node-sass](https://github.com/sass/node-sass#install), Windows users need this to build the required binaries
6. Type `npm install -g yo grunt-cli bower generator-bitmaker` and hit enter
  - You must be connected to the Internet for this step to work
  - You'll see a ton of output from doing this and it may take a little while

#### MAC & LINUX

1. Go to your command line
  - On Mac and Linux, open the Terminal program (or iTerm if you've installed it). On Mac, you can use Spotlight (`Cmd-Space`) or find it in `Applications -> Utilities -> Terminal`.
2. Run the following command at the command prompt:
  - Follow the instructions carefully throughout the installation
  - It may prompt you for your computer's login password once or twice
    - When typing your password on the command line, you won't see any text on the screen, but don't worry, it's accepting your password
  - Pay close attention to the output!
  - You must be connected to the Internet for this to work
  - Mac users will need to install Command-Line Tools from Apple
    - The installer will attempt to do this for you, but if it doesn't succeed you'll need to do it manually
      - [Command Line Tools from the Apple Developer website](https://developer.apple.com/downloads/index.action). You'll need to login with your iTunes credentials and find the correct version of Command Line Tools for your version of OS X
      - You can find your version of OS X by clicking on the Apple icon () at the top left and choosing 'About this Mac'
  - **If you're running OS X 10.6.8 (Snow Leopard) or older, these instructions won't work for you!** See us during class or office hours for help.

```curl https://raw.githubusercontent.com/bitmakerlabs/front-end-development/master/install.sh | sh```


## License

MIT
