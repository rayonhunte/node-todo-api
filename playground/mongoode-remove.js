const {mongoose} = require('./../server/db/mongoode');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectId} = require('mongodb');


// Todo.remove({}).then((result) =>{
//   console.log(result);
// });

 //Todo.findByIdAndRemove()
 //Todo.findByIdAndRemove()
//  Todo.findByIdAndRemove('5ace37385c73ec2a3de7f8c5').then((result)=>{
//     console.log(result)
//  })

Todo.findOneAndRemove({_id:''}).then((result) =>{
  console.log(result)
});