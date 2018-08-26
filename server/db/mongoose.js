const mongoose=require('mongoose');

//telling mongoose that we're gonna use promises
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports={ mongoose};