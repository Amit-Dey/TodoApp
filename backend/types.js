const z = require('zod');

const createTodo = z.object({
    title: z.string(),
});


const updateTodo = z.object({
    id: z.string()
});

const deleteTodo = z.object({
    id: z.string()
});


module.exports = {
    createTodo,
    updateTodo,
    deleteTodo
};