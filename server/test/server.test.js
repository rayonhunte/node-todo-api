const expect = require('expect');
const request = require('supertest');

const {Todo} = require('../models/todo');
const {app} = require('../server');
const {ObjectId} = require('mongodb');


const todos = [
  {
    _id: new ObjectId(),
    text: 'First todo'
  },
  {
    _id: new ObjectId(),
    text: 'Second todo'
  }
]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=> done())
});

describe('POST /todos', ()=>{
  it('should create a new todo', (done) =>{
    let text = 'Test to do text';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    }).end((err, res)=>{
      if(err){
        return done(err);
      }
      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text)
        done()
      }).catch((e)=>done(e))
    })
  })
  it('should try to create a todo and trow a error', (done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) =>{
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2)
      })
      done()
    })
  })
})

describe('Get /todos', ()=>{
  it('should get a list of todos', (done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2)
    })
    .end(done);
  })
})

describe('GET /todos/:id', ()=>{
  it('should find to by id', (done) =>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text) 
    }).end(done);
  })
  it('should return 404 error', (done) =>{
    request(app)
    .get(`/todos/${new ObjectId().toHexString()}`)
    .expect(404)
    .end(done);
  })
  it('should return 404 error on invalid id', (done) =>{
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  })
})