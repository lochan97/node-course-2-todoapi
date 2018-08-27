var express=require('express');
var bodyParser=require('body-parser');

const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var{Todo}=require('./models/todos');
var{User}=require('./models/user');

var app=express();
const port=process.env.PORT || 3000;
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
(e)=>{res.status(400).send(e);});
});

//getting todos
app.get('/todos',(req,res)=>{
    //passing back object back with todos:todos to send back other stuff in future like status code etc
Todo.find().then((todos)=>{res.send({todos});},
(e)=>{res.status(400).send(e);});
});

//getting an individual resource
app.get('/todos/:id',(req,res)=>{
var id = req.params.id;
if(!ObjectID.isValid(id)){
    return res.status(404).send();
    
 }
//just using id to find
Todo.findById(id).then((todo)=>
{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
}).catch((e)=>{res.status(400).send(e);});
});

//delete route
app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
        
     }

     Todo.findByIdAndRemove(id).then((todo)=>
    {
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
    }).catch((e)=>{res.status(400).send(e);})
});


app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
 
module.exports={app};




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