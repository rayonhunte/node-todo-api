const expect = require('expect');
const request = require('supertest');

const {Todo} = require('../models/todo');
const {app} = require('../server');
const {ObjectId} = require('mongodb');
const {User} = require('../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', ()=>{
  it('should create a new todo', (done) =>{
    let text = 'Test to do text';
    request(app)
    .post('/todos')
    .set('x-auth', users[0].tokens[0].token)
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    }).end((err, res)=>{
      if (err){
        return done(err);
      }
      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>done(e));
    });
  });
  it('should try to create a todo and trow a error', (done)=>{
    request(app)
    .post('/todos')
    .set('x-auth', users[0].tokens[0].token)
    .send({})
    .expect(400)
    .end((err, res) =>{
      if (err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
      }).catch((err)=>done(err));
      done();
    });
  });
});

describe('Get /todos', ()=>{
  it('should get a list of todos', (done)=>{
    request(app)
    .get('/todos')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(1);
    })
    .end(done);
  });
});

describe('GET /todos/:id', ()=>{
  it('should return a todo doc', (done) =>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });
  it('should return not todo doc', (done) =>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done);
  });
  it('should return 404 error', (done) =>{
    request(app)
    .get(`/todos/${new ObjectId().toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
  });
  it('should return 404 error on invalid id', (done) =>{
    request(app)
    .get('/todos/123')
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', ()=>{
  it('should update the todo', (done)=>{
    const hexId = todos[1]._id.toHexString();
    const text = 'so yea done';
    const updateObj = {text, completed:true};
    request(app)
    .patch(`/todos/${hexId}`)
    .set('x-auth', users[1].tokens[0].token)
    .send(updateObj)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(updateObj.text);
      expect(res.body.todo.completed).toBe(true);
      expect(typeof res.body.todo.completedAt).toBe('number');
    }).end((err, res)=>{
      if (err){
        return done(err);
      }
      done();
    });
  });
  it('it to update a todo as the second user', (done)=>{
    const hexId = todos[1]._id.toHexString();
    const text = 'so yea done';
    const updateObj = {text, completed:true};
    request(app)
    .patch(`/todos/${hexId}`)
    .set('x-auth', users[0].tokens[0].token)
    .send(updateObj)
    .expect(404)
    .end((done));
  });
  it('should clear completedAt when todo is not completed', (done)=>{
    const hexId = todos[1]._id.toHexString();
    const text = 'redo this thing';
    const updateObj = {text, completed:false};
    request(app)
    .patch(`/todos/${hexId}`)
    .set('x-auth', users[1].tokens[0].token)
    .send(updateObj)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(updateObj.text);
      expect(res.body.todo.completed).toBeFalsy();
      expect(res.body.todo.completedAt).toBeFalsy();
    }).end((err, res)=>{
      if (err){
        return done(err);
      }
      done();
    });
  });
});

describe('Delete todo by id', ()=>{
  it('should delete record by id', (done) =>{
    const hexId = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId);
    }).end((err, res) =>{
      if (err){
        return done(err);
      }
      Todo.findById(hexId).then((todo) =>{
        expect(todo).toBeFalsy();
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });
  it('should return a 404 if id not found', (done)=>{
    request(app)
    .delete(`/todos/${new ObjectId().toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
  });
  it('should return a 404 if invalid id', (done)=>{
    request(app)
    .delete('/todos/1234')
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
  });
});

describe('GET /user/me', ()=>{
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/user/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it('should provide a 401 if not authenticates', (done)=>{
    request(app)
    .get('/user/me')
    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});


describe('POST /users', ()=>{
  it('should create a user', (done)=>{
    const email = 'rest@test.com';
    const password = '123mnb!';
    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res)=>{
      expect(res.headers['x-auth']).toBeTruthy();
      expect(res.body.email).toBe(email);
    })
    .end((err)=>{
      if (err){
        return done(err);
      } else {
        User.findOne({email}).then((user)=>{
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        });
      }
    });
  });
  it('should return validation errors if request invalid ', (done)=>{
    const email = 'somestuff';
    const password = 'somemore';
    request(app)
    .post('/users')
    .send({email, password})
    .expect(400)
    .end(done);
  });
  it('should not create user if email in use', (done)=>{
    const email = 'test@home.com';
    const password = '123456sdf';
    request(app)
    .post('/users')
    .send({email, password})
    .expect(400)
    .end(done);
  });

});

describe('POST /user/login', () => {
  it('it should login user and create token', (done)=>{
   request(app)
   .post('/users/login')
   .send({
     email: users[0].email,
     password: users[0].password
    })
   .expect(200)
   .expect((res)=>{
    expect(res.headers['x-auth']).toBeTruthy();
   }).end((err, res)=>{
    if (err){
      return done(err);
    };
    User.findById(users[0]._id).then((user)=>{
      expect(user.tokens[0]).toHaveProperty(['access']);
    done();
    }).catch((err)=>{
      done(err);
    });
   });
  });
  it('should reject invalid login', (done)=>{
    request(app)
    .post('/users/login')
    .send({email: users[0].email, password:'12345678'})
    .expect(401)
    .end((err)=>{
      if (err){
        return done(err);
      }
      done();
    });
  });
});

describe('DELETE /users/token', ()=>{
  it('should remove auth token on logout', (done)=>{
    request(app)
    .delete('/users/me/token')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .end((err, res)=>{
      if (err){
        return done(err);
      }
      User.findById(users[0]._id).then((user)=>{
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((err)=>done(err));
    });
  });
});
