// const env = process.env.NODE_ENV || 'development';
// console.log('env ******* ', env);


// if(env === 'development'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if(env==='test'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }


require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');


const {mongoose} = require('./db/mongoode');
const {ObjectId} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc)
  }, (e) =>{
    res.status(400).send(e)
  })
});

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e)
  })
});

app.get('/todos/:id', (req, res) =>{
  const todo = req.params
  if(!ObjectId.isValid(todo.id)){
    return res.status(404).send({err:'invalid id'})
  }
  Todo.findById(todo.id).then((todo) =>{
    if(!todo){
      return res.status(404).send({err:'no such todo'})
    }
    res.send({todo})
  }).catch((e) => {
    console.log(e)
    res.status(404).send()
  }); 
})

app.delete('/todos/:id', (req, res) =>{
  const todo = req.params.id
  if(!ObjectId.isValid(todo)){
    return res.status(404).send({})
  }
  Todo.findByIdAndRemove(todo).then((todo)=>{
    if(!todo){
      return res.status(404).send({todo})
    }
    res.status(200).send({todo})
  }).catch((e) =>{
    res.status(400).send({err:e});
  })
})

app.patch('/todos/:id', (req, res) =>{
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed'])
  if(!ObjectId.isValid(id)){
    return res.status(404).send({err:'invalid id'})
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false
    body.completedAt = false
  }
  Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) =>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e)=>{
    res.status(400).send()
  })
})

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
})

module.exports = {app};