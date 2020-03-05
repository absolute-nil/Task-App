const request = require("supertest");
const Task = require("../src/models/Task")
const app = require("../src/app");
const { userOne,userOneId,setUpDatabse,taskThree} = require("./fixtures/db")

//
// Task Test 
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks

beforeEach(setUpDatabse)

test('create new tasks for a user',async ()=>{
    const response =await request(app)
    .post('/tasks')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'this is from my test'
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('fetch all tasks of the logged in user',async()=>{
    const response = await request(app)
    .get('/tasks')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})

test('should not be able to delete task of another user',async()=>{
    const response = await request(app)
    .delete(`/tasks/${taskThree._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404)
    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull(); 
})