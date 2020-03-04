const PORT = process.env.PORT || 3000;
const app = require("./app")


app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});

// require("./models/Task")
// const main = async()=>{
//   const task = await Task.findById();
//   await task.populate('owner').execPopulate();

// }