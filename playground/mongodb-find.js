const {MongoClient,ObjectID}= require('mongodb');
//  const MongoClient= require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
if(err){
   return console.log('unable to connect to MongoDB server');
}
console.log('Connected to MongoDB server');
//.find gives mongodb cursor to the documents
// db.collection('Todos').find().toArray().then((docs)=>
//.toarray gives the docs and returns a promise
//sending a query to find to filter data
// db.collection('Todos').find({completed:false}).toArray().then((docs)=>
// querying by id
// db.collection('Todos').find({
//     //destructuring to query the ID
//     _id:new ObjectID("5b80748862e8ce0970d4b74c")
//     // "5b80748862e8ce0970d4b74c" wont work
// }).toArray().then((docs)=>
// {
//     console.log('Todos');
//     console.log(JSON.stringify(docs,undefined,2));
//     //printing docs to the screen

// },(err)=>{
//     console.log('Unable to fetch todos',err);
// });

//using count to count all the todos in the todo
// db.collection('Todos').find().count().then((count)=>
// {
//     console.log('Todos Count',count);
// },(err)=>{
//     console.log('Unable to fetch todos',err);
// });

db.collection('Users').find({
    name:"Lochan"
}).toArray().then((docs)=>
{
    console.log('Users with name Lochan');
    console.log(JSON.stringify(docs,undefined,2));
    //printing docs to the screen

},(err)=>{
    console.log('Unable to fetch users',err);
});

// db.close();
});