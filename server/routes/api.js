var express = require('express');
var router = express.Router();
var User = require('../models/user');


//get ALL users
router.get('/users', function(req, res, next){
  User.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//get ONE user
router.get('/user/:id', function(req, res, next){
  User.findById(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//POST one
router.post('/users', function(req, res, next){
  var query = {"name": req.body.name};
  var options = {upsert: true, new: true};
  var update = {
    'name': req.body.name,
    'password': req.body.password,
    $push: {'wines':{'name': req.body.name, 'image': req.body.image, 'varietal': req.body.varietal}}};
    User.findOneAndUpdate(query, update, options, function(err, data){
      if(err){
        res.json({'message': err});
      } else {
        res.json({"SUCCESS": data});
      }
    });
  });


module.exports = router;
