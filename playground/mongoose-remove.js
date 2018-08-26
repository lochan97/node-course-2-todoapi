
//loading in objectID to make sure the ID isnt wrongly written
const {ObjectID}=require('mongodb');

const {mongoose} =require('../server/db/mongoose');
const {Todo} =require('../server/models/todos');
const {User}=require('../server/models/user');

//deleting all records
// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

// Todo.findOneAndRemove removes by more than just the id if need be
Todo.findOneAndRemove({_id:'5b832e7b5213f6c5ad9da90b'}).then((todo)=>{
    console.log(todo);
});

//removes by id
Todo.findByIdAndRemove('5b832e7b5213f6c5ad9da90b').then((todo)=>{
    console.log(todo);
});