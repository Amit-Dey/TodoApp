const mongoose = require('mongoose');

mongoose.connect('Your MongoDb URL')


const TodoSchema = new mongoose.Schema({
    title: String,
    complited: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    Todo
}