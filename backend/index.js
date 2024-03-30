const express = require('express');
const { createTodo, updateTodo,deleteTodo} = require('./types');
const { Todo } = require('./db');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/todos', async (req, res) => {
    const todos = await Todo.find({});
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Wrong input" });
    }
    // put it in the mongodb
    await Todo.create({
        title: createPayload.title,
        complited: false
    });
    const todos = await Todo.find({});

    res.json(todos);
});

app.put('/complited', async (req, res) => {
    
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Wrong input" });
    }
    const complited = await Todo.findOne({
        _id: updatePayload.id
    });
    if (!complited) {
        return res.status(404).json({ msg: "Todo not found" });
    }
    const complitedValue = complited.complited;

    // put it in the mongodb
    await Todo.updateOne({
        _id: updatePayload.id
    }, {
        complited: !complitedValue
    });
    const updatedTodo = await Todo.find({});
    res.json(updatedTodo);

});
app.delete('/todos', async (req, res) => {
    const deletePayload = req.body;
    const parsedPayload = deleteTodo.safeParse(deletePayload);
    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Wrong input" });
    }
    const deletedTodo = await Todo.findOne({
        _id: deletePayload.id
    });
    if (!deletedTodo) {
        return res.status(404).json({ msg: "Todo not found" });
    }
    // put it in the mongodb
    await Todo.deleteOne({
        _id: deletePayload.id
    });
    res.json({ msg: "Todo deleted" });
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

