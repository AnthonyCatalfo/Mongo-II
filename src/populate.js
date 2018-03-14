/* eslint-disable */
const fs = require('fs');
let savedPosts = null;

const Post = require('./post.js');

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

const populatePosts = () => {
  // TODO: implement this
 readPosts();
  


  return new Promise((resolve, reject) =>{ 
    const p = savedPosts.map( ob => 
      { 
        //console.log("ob",ob);
        return new Post(ob).save();
       }); 
       Promise.all(p) 
       .then(post => {  
        resolve(post); 
        }) 
        .catch( err => { 
          reject(err);
         }) 
        });

};

module.exports = { readPosts, populatePosts };
