const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoode');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
app.use(bodyParser.json());


app.post('/todos', (req, res) => {
  console.log(req.body)
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc)
  }, (e) =>{
    res.status(400).send(e)
  })
});

app.listen(3000, ()=>{
  console.log('Started on port 3000');
})


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

