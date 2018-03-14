/* eslint-disable */
const bodyParser = require('body-parser');
const express = require('express');
const {readPosts, populatePosts} = require('./populate.js');
const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests

server.use(bodyParser.json());

// TODO: write your route handlers here
server.get("/",(req,res) => {
    console.log("in root");
    populatePosts();
    res.send("OK");
});
server.get("/accepted-answer/:soID",(req,res) => {
    let docId=null;
    Post.findOne({soID: req.params.soID}, function(err,doc){
    if(err){
        res.status(STATUS_USER_ERROR).json({error:"Something went wrong!"});
    }else{
        docID=doc.acceptedAnswerID;
    }

    Post.findOne({soID: docID},function(err,doc){
        if(err){
            res.status(STATUS_USER_ERROR).json({error:"Something went wrong!"});
        }else{
            res.status(200).json(doc);
        }
    });
});


});
    server.get("/top-answer/:soID",(req,res) => {
        let docId=null; 
        Post.findOne({soID: req.params.soID}, function(err,doc){
        if(err){
            res.status(STATUS_USER_ERROR).json({error:"Something went wrong!"});
        }else{
            
          docID=doc.acceptedAnswerID;
            
        }
    
        Post.findOne({soID: docID},function(err,doc){
            if(err){
                res.status(STATUS_USER_ERROR).json({error:"Something went wrong!"});
            }else{
                res.status(200).json(doc);
            }
        });
    });
    
    
    });


module.exports = { server };
