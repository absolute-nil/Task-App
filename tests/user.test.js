const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Sharma",
  email: "sharma@example.com",
  password: "what@1!!01",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Nikhil Sharma",
      email: "1@example.com",
      password: "test101101!"
    })
    .expect(201);

    //assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assertions about response
    expect(response.body).toMatchObject({
        user:{
            name: "Nikhil Sharma",
            email: "1@example.com"
            
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('test101101!')
});

test("should log in existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
    
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
});
 
test("should not login not existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "12345678"
    })
    .expect(400);
});

test("should get profile of logged in user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get the profile of user that is not logged in", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
});
 
test("should not delete account for unauthorized user", async () => {
  await request(app)    
    .delete("/users/me")
    .send() 
    .expect(401); 
});

test('should upload profile picture for loggedin user',async () =>{
    await request(app)
    .post('/users/me/avatar')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid users field',async ()=>{
    await request(app)
    .patch('/users/me')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
        name:"sharma1",
        age: "10"
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('sharma1')
}) 

test('should not update invalid fields',async ()=>{
    await request(app)
    .patch('/users/me')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "sharma",
        location: "amsterdam"
    }).expect(400)
})