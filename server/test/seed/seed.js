const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');


const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [
{
    _id: userOneId,
    email: 'test@home.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userOneId, access: 'auth'}, '123abc').toString()
    }]
},
{
    _id: userTwoId,
    email: 'test2@home.com',
    password: 'userTwoPass'
}
];


const todos = [
    {
      _id: new ObjectId(),
      text: 'First todo'
    },
    {
      _id: new ObjectId(),
      text: 'Second todo',
      completed: true,
      completedAt:33
    }
  ];

  const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
      return Todo.insertMany(todos);
    }).then(()=> done());
  };

  const populateUsers = (done)=>{
    User.remove({}).then(()=>{
     let userOne = new User(users[0]).save();
     let userTwo = new User(users[1]).save();
     return Promise.all([userOne, userTwo]);
    }).then(()=>done());
  };

  module.exports = {todos, populateTodos, users, populateUsers};
