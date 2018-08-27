const  express=require('express');
const  bodyParser=require('body-parser');
const _=require('lodash');
const {ObjectID}=require('mongodb');
const  {mongoose}=require('./db/mongoose');
const {Todo}=require('./models/todos');
const {User}=require('./models/user');

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
//for updating
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
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