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

  //delete many
  //collection.deleteMany({text: 'walk the dog'}).then((result)=>{
  //  console.log(result);
  //});

  //deleteOne
  //collection.deleteOne({text: 'working'}).then(()=>{
  // console.log(result);
  //})

  //findOneAndDelete
  //collection.findOneAndDelete({completed: false}).then((result)=>{
  //  console.log(result)
  //})

  collection.findOneAndDelete({_id: new ObjectID('5a9307f1cc7a90d49db7ae5d')}).then((result) =>{
    console.log(result)
  })
  
  client.close();
});

