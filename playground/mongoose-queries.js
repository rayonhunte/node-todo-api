const {mongoose} = require('./../server/db/mongoode');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectId} = require('mongodb');


const id = '5ac799bb025b855006852fbd';
const userId = '5a96de1a2e97127978b52a07';

if (!ObjectId.isValid(id)){
  console.log('invalid id')
}

// Todo.find({_id: id}).then((todos)=>{
//   console.log('Todos', todos);
// })

// Todo.findOne({_id: id}).then((todo)=>{
//   console.log('Todo', todo);
// })

// Todo.findById(id).then((todo) =>{
//   if(!todo){
//     return console.log('todo not found')
//   }
//   console.log('Todo', todo)
// }).catch((e)=> console.log(e))


User.findById(userId).then((user)=>{
  if(!user){
    return console.log('user id dose not exist')
  }
  console.log(user);
}).catch((e)=>{
  console.log(e)
})