const {MongoClient,ObjectID}= require('mongodb');
//  const MongoClient= require('mongodb').MongoClient;


// //destructuring example
// var user={
//     name:'Andrew',
//     age:25
// };
// var {name}=user;
// console.log(name);
//creating a database called TodoApp
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
if(err){
   return console.log('unable to connect to MongoDB server');
}
console.log('Connected to MongoDB server');

// db.collection('Todos').insertOne({
//     text:'Something to do',
//     completed: false
// },(err,result)=>{
//     if(err)
//     {
//      return console.log('Unable to insert ToDo',err);   
//     }
// console.log(JSON.stringify(result.ops,undefined,2));
// })

// db.collection('Users').insertOne({
//     name:'Lochan',
//     age: 21,
//     location:'Sharjah'
// },(err,result)=>{
//     if(err)
//     {
//      return console.log('Unable to insert Users',err);   
//     }
// // console.log(JSON.stringify(result.ops,undefined,2));
// console.log(result.ops[0]._id.getTimestamp());
// })
//closing connection with mongoDB file

//object destructuring
db.close();
});