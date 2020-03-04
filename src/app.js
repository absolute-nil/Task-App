const express = require("express");
require("./db/mongoose");
const app = express();

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'))
//         }

//         cb(undefined, true)
//     }
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// },
//   (error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })


const userRouter = require("./router/User");
const taskRouter = require("./router/Task");

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);





module.exports = app
// require("./models/Task")
// const main = async()=>{
//   const task = await Task.findById();
//   await task.populate('owner').execPopulate();

// }