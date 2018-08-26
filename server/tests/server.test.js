const expect=require('expect');
const request=require('supertest');

const {app}=require('./../server');
const {Todo}=require('./../models/todos');

//using beforeEach to setup the database to be empty
beforeEach((done)=>{
    Todo.remove({}).then(()=>done());
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
          Todo.find().then((todos)=>
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
                expect(todos.length).toBe(0);
                done();
            }).catch((e)=>done(e));
        });
    });
});