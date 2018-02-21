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

  // db.collection('Todos').insert({
  //   text: 'Something to do',
  //   completed:false,
  // }, (err, result)=>{
  //   if(err){
  //     console.log(err);
  //     return;
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('User').insert({
  //   name: 'Rayon',
  //   age: 36,
  //   location: 'Guyana',
  // }, (err, result) =>{
  //   if (err){
  //     console.log('Unable to insert record')
  //     return;
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  client.close();
});

