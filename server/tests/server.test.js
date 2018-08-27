const expect=require('expect');
const request=require('supertest');

const {ObjectID}=require('mongodb');
const {app}=require('./../server');
const {Todo}=require('./../models/todos');

//making an array of dummy todos to test the get
const todos =[{
    _id:new ObjectID(),
    text:'First test todo'
},{
    _id:new ObjectID(),
    text:'Second test todo'
}]


//using beforeEach to setup the database to be empty
//modifying it to include the get stuff
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
    }).then(()=>done());
});


describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text='Test todo text';
        request(app)
        .post('/todos')
        //sending data via the post request
        .send({text})
        //what we're expecting
        //status 200
        .expect(200)
        //custom expect for getting body with text same as what was posted
        .expect((res)=>{
            expect(res.body.text).toBe(text);

        })
        //using end to check what got stored in the mongodb collection
        //handling error if any
        .end((err,res)=>{
          if(err){
              return done(err);
          }  
          //if no error, fetching the todos
          //only finding todos where the text is same as above
          Todo.find({text}).then((todos)=>
        {
          expect(todos.length).toBe(1);  
          expect(todos[0].text).toBe(text);
          done();
          //catching any errs from within the callback
        }).catch((e)=>done(e));
        });
    });

    //creating new test case to verify that a todo isnt created when bad data is sent
    it('should not create todo with invalid data',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });
    });
});

describe('GET /todos',()=>{
    it('Should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    })
})

describe('GET /todos/:id',()=>{
  it("should return todo doc",(done)=>{
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
.expect(200)
.expect((res)=>{
    expect(res.body.todo.text).toBe(todos[0].text);
}) .end(done); 
})  ;

it("should return 404 if todo not found",(done)=>{
   var nid= new ObjectID;
    request(app).get(`/todos/${nid.toHexString()}`)
.expect(404)
 .end(done); 
})  ;
it("should return 404 for non object IDs",(done)=>{
     request(app).get(`/todos/${123}`)
 .expect(404)
  .end(done); 
 });
});

describe('DELETE /todos/:id',()=>{
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
    
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
    
            Todo.findById(hexId).then((todo) => {
              expect(todo).toNotExist();
              done();
            }).catch((e) => done(e));
          });
      });

    it('Should return 404 if todo not found',(done)=>{
        var hid= new ObjectID;
        request(app).get(`/todos/${hid.toHexString()}`)
    .expect(404)
     .end(done); 
    });

    it('Should return 404 if object id is invalid',(done)=>{
        request(app).get(`/todos/123`)
    .expect(404)
     .end(done); 
    });

    describe('PATCH /todos/:id',()=>{
        it('should update the todo',(done)=>{
            var hexId = todos[0]._id.toHexString();
            request(app)
            .patch(`/todos/${hexId}`)
            .send({text:"boi",
        completed:true})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe("boi");
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        }).end(done);
        });

        it('should clear completedAT when todo is not completed',(done)=>{
            var hexId = todos[1]._id.toHexString();
            request(app)
            .patch(`/todos/${hexId}`)
            .send({text:"boi!!!",
        completed:false})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe("boi!!!");
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        }).end(done);
        });


    });
});