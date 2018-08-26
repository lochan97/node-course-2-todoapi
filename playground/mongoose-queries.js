
//loading in objectID to make sure the ID isnt wrongly written
const {ObjectID}=require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todos');
const {User}=require('./../server/models/user');
// var id="6b82c5b921baf96423a25ce811";

// // ObjectID.isValid to see if an ID is valid
// if(!ObjectID.isValid(id)){
// console.log('ID not valid');
// }

// //querying by ID
// Todo.find({
//     _id:id
// }).then((todos)=>{
    
//     console.log('Todos',todos);
// });
// //better if only finding a single one instead of an array
// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

//just using id to find
// Todo.findById(id).then((todo)=>
// {
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo By Id',todo);
// }).catch((e)=>console.log(e));


//challenge
var id="5b81ebaf53b71a601a9949de";

User.findById(id).then((user)=>
{
    if(!user){
       return console.log('ID not found');
        
    }

    console.log(JSON.stringify(user, undefined, 2)); 
}).catch((e)=>console.log(e));