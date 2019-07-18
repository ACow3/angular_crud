const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/task', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
app.use(bodyParser.json()); // to send as json
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static(__dirname + '/public/dist/public'));


// ------------------------- task Schema --------------------------


var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"]
    },
    description: {
        type: String,
        default: '',
        required: [true, "Task description is required"]
    },
    completed: {
        type: String,
        default: '',
        required: [true, "Is this task completed?"]
    }
}, {
    timestamps: true
})
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');
module.exports = {
    Task
}

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

// Show all tasks
app.get('/tasks', (req, res) => {
    Task.find({}, function (err, all_tasks) {
        if (err) {
            console.log("Returned error", err);
            res.json({
                "Message": "Error",
                "error": err
            })
        } else {
            res.json({
                "Message": "Success",
                tasks: all_tasks
            })
        }
    })
})

// Create new task
app.post('/tasks/new', (req, res) => {
    Task.create(req.body, (err, new_task) => {
        if (err) {
            console.log("Create was unsuccesful");
            res.json({
                "Message": "Error",
                "error": err
            })
        } else {
            console.log(new_task);
            res.json({
                "Message": "Success",
                "task": new_task
            })
        }
    })
})

// Delete one task
app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err) {
            console.log("");
            res.json({
                "Message": "Error",
                "error": err
            })
        } else {
            res.json({
                "Message": "Success"
            })
        }
    })
})

// Show one task
app.get('/tasks/:id', (req, res) => {
    Task.findOne({
        _id: req.params.id
    }, (err, task) => {
        if (err) {
            console.log("Error finding task");
            res.json({
                "Message": "Error",
                "error": err
            })
        } else {
            console.log(task)
            res.json({
                "Message": "Successfully displaying one task",
                task: task
            })
        }
    })
})

// Edit one task
app.put("/tasks/:id", (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.id
    }, req.body, (err, task) => {
        if (err) {
            console.log("Error editing task");
            res.json({
                "Message": "Error",
                "error": err
            })
        } else {
            console.log(task)
            res.json({
                "Message": "Successful update",
                task: task
            })
        }
    })
})




app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// Setting our server to listen on port: 8000
app.listen(8000, function () {
    console.log("Now listening on port 8000");
})