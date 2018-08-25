const {MongoClient,ObjectID}= require('mongodb');
//  const MongoClient= require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
if(err){
   return console.log('unable to connect to MongoDB server');
}
console.log('Connected to MongoDB server');

//deleteMany
// db.collection('Todos').deleteMany({text:'Something to do'}).then((result)=>{
//     console.log(result);
// });

//deleteOne
// db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
//         console.log(result);
//     });


//findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
//             console.log(result);
//         });

// exercise
db.collection('Users').deleteMany({name:'Lochan'}).then((result)=>{
    console.log(result);
});


db.collection('Users').findOneAndDelete({_id:new ObjectID("5b80752dad56a11a2447a16a")}).then((result)=>{
    console.log(result);
});
// db.close();
});