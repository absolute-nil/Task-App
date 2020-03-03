const express = require("express");
const PORT = process.env.PORT || 3000;
require("./db/mongoose");
const app = express();

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})


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