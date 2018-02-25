//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

//let obj = ObjectID(); 
//console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if(err){
    console.log(err);
    return;
  }
  console.log('connected to Mongodb Sever')
  
  const db = client.db('Todos');
  const collection = db.collection('Todos')
  
  collection.findOneAndUpdate({
    _id: ObjectID('5a930f3bcc7a90d49db7af2b')},
    {$set:{
      completed: true
    }}, {returnOriginal: false}
  ).then((result)=>{
    console.log(result);
  })

  const userCollection = db.collection('User')

  userCollection.findOneAndUpdate(
    { _id: ObjectID('5a8d871b44747c3f2c6d68fa') }, 
    {$inc: {age: 1}, $set:{name: 'Max'}}, 
    {returnOriginal: false}
).then((result)=>{
  console.log(result)
})

  client.close();
});

