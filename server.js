var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


mongoose.connect('mongodb://localhost:27017/todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
var Todo = mongoose.model('Todo', {
    text: String,
    status: String
});

function getTodoList(req, res) {
    return Todo.find({status: null}, function (err, todos) {
        if (err)
            res.send(err);
        res.json(todos);
    });
}

function getDoneList(req, res) {
    return Todo.find({status: "done"}, function (err, todos) {
        if (err)
            res.send(err);
        res.json(todos);
    });
}

app.get("/getTodos", function (req, res, next) {
    return getTodoList(req, res);
});

app.get("/getDoneList", function (req, res, next) {
    return getDoneList(req, res);
});

app.post("/createTodo", function (req, res, next) {
    console.log("inCreateTodo", req.body.text);
    Todo.create({text: req.body.text, done: false, c_o_d: new Date()}, function (err, todo) {
        if (err)
            res.send(err);
        return getTodoList(req, res);
    })
});

app.delete("/deleteTodo:todo_id", function (req, res, next) {
    Todo.remove({_id: req.params.todo_id}, function (err, todo) {
        if (err)
            res.send(err);
        return getTodoList(req, res);
    })
});


app.put("/markDone:todo_id", function (req, res, next) {
    console.log("inconsole");
    Todo.update({_id: req.params.todo_id}, {status: 'done', d_o_d: new Date()}, function (err, todo) {
        if (err)
            res.send(err);
        //console.log("todoAfterUpdate>>>" + JSON.stringify(todo));
        return getTodoList(req, res);
    })
});

app.get('*', function (req, res) {
    res.sendfile('.public/index.html');
});


app.listen(3500, function () {
    console.log("app is running at 3500");
});