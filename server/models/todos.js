var mongoose=require('mongoose');

//creating mongoose model so it knows how to store our data
var Todo=mongoose.model('Todo',{
    text:{type: String,
    //making it required validation error if it isnt there
    required: true,
//minimum length validator
minlength:1,
//trimming whitespaces
trim: true
},
    completed:{type: Boolean,
    //giving it a default false value
default:false},
    completedAt:{type: Number,
        //default null if it hasnt been completed
    default:null}
});

module.exports={Todo};