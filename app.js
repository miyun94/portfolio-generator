//used the array method .slice() to return a brand-new array based on process.argv starting at the third index (i.e., index 2 in the zero-based array), and ending with the final index
//const keyword to create variables that can't be reassigned a value 
const profileDataArgs = process.argv.slice(2);

// const name = profileDataArgs[0]; 
// const github = profileDataArgs[1]; --> these two can be rewritten as 
const [name, github] = profileDataArgs; 

const fs = require('fs'); 



fs.writeFile('./index.html', generatePage(name, github), err=> {
    if (err) throw new Error(err); 
    console.log('Portfolio Complete! Check out index.html to see the output!')
}); 