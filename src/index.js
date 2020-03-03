const express = require("express");
const PORT = process.env.PORT || 3000;
require("./db/mongoose");
const app = express();

const userRouter = require("./router/User");
const taskRouter = require("./router/Task");

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});

// require("./models/Task")
// const main = async()=>{
//   const task = await Task.findById();
//   await task.populate('owner').execPopulate();

// }