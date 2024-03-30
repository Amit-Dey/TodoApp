import PropTypes from 'prop-types';

function Todos({ todos, setTodos }) {
    return (
        <div className='todoList' >
            {todos.map((todo , index) => (
                <div className='todo' key={index}>
                    <h2 className='todoTitle poppins-regular' >{todo.title}</h2>
                    <button className='todoDelete' onClick={
                        async () => {
                            await fetch(`http://localhost:3000/todos`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id: todo._id })
                            });
                            const response = await fetch('http://localhost:3000/todos');
                            const data = await response.json();
                            setTodos(data);
                        }
                    }>
                        <img src='/delete.png' width={20} alt='delete-icon' />
                    </button>
                </div>
            ))}
        </div>
    );
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    setTodos: PropTypes.func.isRequired
};

export { Todos };

