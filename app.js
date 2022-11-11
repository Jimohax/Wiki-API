const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose.connect("mongodb+srv://jamie:user123@cluster0.6epyk.mongodb.net/wikiDB");

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
localhost:27017
const articleSchema = {
    title : String,
    content: String

  };
  
  const Article = mongoose.model(
    "Article", articleSchema
  );

//////request for all articles/////

  app.route("/articles")
  .get(function(req, res){

    Article.find(function(err, results){
      if(!err){
        res.send(results);
      }else{
        res.send(err);
      }
        
        // console.log(result);
    });
    
})
  .post(function(req, res){

    console.log(req.body.title);
    console.log(req.body.content);
  
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    }); 
    newArticle.save(function(err){
      if(!err){
        res.send("Successfully added a new article");
      }else{
        res.send(err);
      }
    });
  })
  .delete(function(req, res){
    Article.deleteMany(function (err){
      if(!err){
        res.send("All articles deleted");
      }else{
        res.send(err);
      }
        
    });
  });

//////request for specific article////////////

app.route("/articles/:articleTitle")

.get(function(req, res){

  Article.findOne({title: req.params.articleTitle}, function(err, result){
   if (result){
    res.send(result);
   } else{
    res.send("Article not found");
   }
  });
})

.put(function(req, res){
  Article.updateOne(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    // {overwrite:true},
    function(err){
      if(!err){
        res.send("Successfully updated article");
      }else{
        res.send("Couldnt update article");
      }
    }
  );
})

.patch(function(req, res){
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated article")
      }else{
        res.send(err);
      }
    }
  );
})
.delete(function(req, res){
  Article.deleteOne(
   {title: req.params.articleTitle},
   function(err){
    if(!err){
      res.send("Successfully deleted one article");
    }else{
      res.send(err);
    }
   } 
  );
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});