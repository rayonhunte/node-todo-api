require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');


const {mongoose} = require('./db/mongoode');
const {ObjectId} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());


app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc)=>{
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res)=>{
  Todo.find({_creator: req.user._id}).then((todos)=>{
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) =>{
  const todo = req.params;
  if (!ObjectId.isValid(todo.id)){
    return res.status(404).send({err:'invalid id'});
  }
  Todo.findOne({_id:todo.id, _creator:req.user._id}).then((todo) =>{
    if (!todo){
      return res.status(404).send({err:'no such todo'});
    }
    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  });
});

app.delete('/todos/:id', authenticate, (req, res) =>{
  const todo = req.params.id;
  if (!ObjectId.isValid(todo)){
    return res.status(404).send({});
  }
  Todo.findOneAndRemove({_id:todo, _creator: req.user._id}).then((todo)=>{
    if (!todo){
      return res.status(404).send({todo});
    }
    res.status(200).send({todo});
  }).catch((e) =>{
    res.status(400).send({err:e});
  });
});

app.patch('/todos/:id', authenticate, (req, res) =>{
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectId.isValid(id)){
    return res.status(404).send({err:'invalid id'});
  }
  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = false;
  }
  Todo.findOneAndUpdate({_id:id, _creator:req.user._id}, {$set:body}, {new:true}).then((todo) =>{
    if (!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
   const user = new User(body);
    user.save().then( () => {
      return user.generateAuthToken();
    }).then( token =>{
      res.header('x-auth',token).send(user);
    }).catch( e =>{
      res.status(400).send(e);
    });
});


app.get('/user/me/', authenticate, (req, res)=>{
  res.send(req.user);
});

app.post('/users/login', (req, res)=>{
  const body = _.pick(req.body,['email', 'password']);
  const {email, password} = body;
  User.findByCredentials(email, password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth', token).send(user);
    });
  }).catch((err)=>{
    res.status(401).send(`User ${email} Not found`);
  });
});

app.delete('/users/me/token', authenticate, (req, res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send('logged out');
  }, (err)=>{
    res.status(400).send();
  });
});


app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};
