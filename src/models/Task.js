const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    description: {
        type:  String,
        required: true,
    },
    completed: {
        type: Boolean,
        default:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //this will allow us to populate the owner field with the entire profile of the owner
        ref: 'User'
    }
},{
    timestamps:true
})

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;
