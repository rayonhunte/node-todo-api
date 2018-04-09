const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoode');
const {ObjectId} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
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

app.listen(3000, ()=>{
  console.log('Started on port 3000');
})

module.exports = {app};


// newUser = new User({
//   email: 'rayon.hunte@gmail.com',
//   password: 'Password'  
// })
// newUser.save().then((doc)=>{
//   console.log(doc)
// }, (e)=>{
//   console.log(e)
// })


// newTodo = new Todo({
//   text: 'write some code',
//   completed: false,
//   completedAt: Math.round(new Date() / 1000)
// })

// newTodo.save().then((doc)=>{
//   console.log(doc)
// }, (e)=>{
//   console.log('Unable to save todo')
// })

