const {MongoClient,ObjectID}= require('mongodb');
//  const MongoClient= require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
if(err){
   return console.log('unable to connect to MongoDB server');
}
console.log('Connected to MongoDB server');

//findOneAndUpdate
// db.collection('Todos').findOneAndUpdate({
//     _id:new ObjectID('5b817517c2303043b81284f6')
// },{
//     //setting completed=true
//     $set:{
//         completed: true
//     }
// },{
//     //set to false to get back updated doc
// returnOriginal:false
// }).then((result)=>{
//     console.log(result);
// })



db.collection('Users').findOneAndUpdate({
    _id:new ObjectID('5b808cdeca98fd1ae063f1df')
},{
    //setting completed=true
    $set:{
        name: "Andrew"
    },
    //incrementing age
    $inc:
    {
        age: 1
    }
},{
    //set to false to get back updated doc
returnOriginal:false
}).then((result)=>{
    console.log(result);
})
// db.close();
});