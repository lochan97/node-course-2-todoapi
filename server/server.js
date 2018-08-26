var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var{Todo}=require('./models/todos');
var{User}=require('./models/user');

var app=express();

//configuring bodyparser middleware
app.use(bodyParser.json());
//creating new todos with post http method
app.post('/todos',(req,res)=>
{
// console.log(req.body);
var todo=new Todo({
    text:req.body.text
});
//saving it
todo.save().then((doc)=>{
    res.send(doc);
},
(e)=>{res.status(400).send(e)});
});

app.listen(3000,()=>{
    console.log('Started on port 3000');
});






// //creating an instance
// var newTodo=new Todo({
//     text:"cook dinner"
// });
// //saving to the mongodb database
// newTodo.save().then((doc)=>{
//     console.log('Saved todo',doc)
// },
// (e)=>{console.log('Unable to save todo')});

// var newnewTodo= new Todo({
//     //sending text as true will convert to string
//    text: 'something to do'
// });

// newnewTodo.save().then((doc)=>{
//     console.log("saved Todo",doc);
// },(e)=>{
//     console.log('unable to save todo',e)
// });
// var newUser= new User(
//     {
//         email:"lochan.yoganathan@gmail.com"
//     }
// );

// newUser.save().then((doc)=>{
//     console.log('Saved new user',doc)
// },(e)=>{console.log('unable to save new user',e)});