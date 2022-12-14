
const fs = require('fs');
const inquirer = require('inquirer');
const skeleton = require("./skeleton"); // used for function on line 81 to generate README.

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project? (Required)",
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter your project title.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Briefly give an explanation of your project. (Required)",
        validate: description => {
          if (description) {
            return true;
          } else {
            console.log("Please write a short description.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "installInfo",
        message: "Provide any installation instructions here:",
      },
      {
        type: 'checkbox',
        name: 'license',
        message: 'Which license(s) are used for this project:',
        choices: ['Apache', 'Mozilla', 'MIT', 'GNU', 'Boost', 'ISC'],
        validate: choicesLength => {
          if (choicesLength.length <= 1) {
            return true;
          } else {
            return "Please select one license!";
          }
        }
      },
      {
        type: "input",
        name: "usageInfo",
        message: "Purpose of application:",
      },
      {
        type: "input",
        name: "contributionsInfo",
        message: "Any contributors?:",
      },
      {
        type: "input",
        name: "testsInfo",
        message: "Which tests would you like to include:",
      },
      {
        type: "input",
        name: "githubUsername",
        message: "What is your GitHub username (Required)?",
      },
      {
        type: "input",
        name: "emailInfo",
        message: "What is a good email someone can reach you(Required)?",
      }
];


function writeToFile(fileName, data) {
    fs.writeFile("./CUSTOMREADME.md", skeleton(data), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('Success!');
      });
}


function init() { 
    inquirer.prompt(questions)
    .then(function(answer) {
      const fileName =
        answer.title
          .split(' ')
          .join('') + '.md';
      
      writeToFile(fileName, answer);
    });
}

init();