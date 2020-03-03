const mongoose = require("mongoose");
const Task = mongoose.model("Task",{
    description: {
        type:  String,
        required: true,
    },
    completed: {
        type: Boolean,
        defalut:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //this will allow us to populate the owner field with the entire profile of the owner
        ref: 'User'
    }
});

module.exports = Task;
