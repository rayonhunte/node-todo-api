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
  const collection = db.collection('User')

  // collection.find({
  //   //completed: false
  //   _id: new ObjectID('5a8d776c32151c39f0ac311c')
  // }).toArray().then((docs, err)=>{
  //  if(err){
  //     console.log('Unable to query db' + err);
  //     return; 
  //  }
  //  console.log(JSON.stringify(docs, undefined, 2));
  // })

  // collection.find({
  //   //completed: false
  //   //_id: new ObjectID('5a8d776c32151c39f0ac311c')
  // }).count().then((count, err)=>{
  //  if(err){
  //     console.log('Unable to query db' + err);
  //     return; 
  //  }
  //  console.log(JSON.stringify(count, undefined, 2));
  // })

  collection.find({name:'Rayon'}).toArray().then((result, err)=>{
    if(err){
      console.log('error finding records' + err);
      return;
    }
    console.log(JSON.stringify(result, undefined, 2));

  })
  
  client.close();
});

