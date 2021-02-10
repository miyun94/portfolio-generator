const fs = require('fs'); 
const inquirer = require('inquirer'); 
const generatePage = require('./src/page-template'); 


//used the array method .slice() to return a brand-new array based on process.argv starting at the third index (i.e., index 2 in the zero-based array), and ending with the final index
//const keyword to create variables that can't be reassigned a value 
//const profileDataArgs = process.argv.slice(2);
//console.log(profileDataArgs); 

// const name = profileDataArgs[0]; 
// const github = profileDataArgs[1]; --> these two can be rewritten as 
//const [name, github] = profileDataArgs; 
//console.log(name, github); 
//const pageHTML = generatePage(name, github); 

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true; 
                } else {
                    console.log('Please enter your name!'); 
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username (require)',
            validate: githubInput => {
                if (githubInput) {
                  return true;
                } else {
                  console.log('Please enter your GitHub username!');
                  return false;
                }
              }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
              },
              {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                when: ({ confirmAbout }) => confirmAbout
              }
    ]); 
}; 

const promptProject = portfolioData => {
        console.log(`
      =================
      Add a New Project
      =================
      `);
      //if there's no 'projects; array property, create one 
      if(!portfolioData.projects) {
          portfolioData.projects = []
      }
        return inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (required)',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('You need to enter a project name!');
                  return false;
                }
              }
          },
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                  return true;
                } else {
                  console.log('You need to enter a project description!');
                  return false;
                }
              }
          },
          {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                  return true;
                } else {
                  console.log('You need to enter a project GitHub link!');
                  return false;
                }
              }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData); 
            if (projectData.confirmAddProject){
                return promptProject(portfolioData); 
            } else {
                return portfolioData
            }
        });
      };
  
  promptUser().then(promptProject).then(portfolioData => {
      console.log(portfolioData); 
  }); 

// fs.writeFile('./index.html', pageHTML, err=> {
//     if (err) throw err; 
//     console.log('Portfolio Complete! Check out index.html to see the output!')
// }); 