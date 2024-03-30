import { useState, useEffect } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(async response => {
        const data = await response.json()
        setTodos(data)
      })
  }, [])

  return (
    <div className='container'>
      <div className='titleBox'>
      <img className='logo' src="/todo-icon.gif" width={50} alt="todo-icon" />
      <h1 className='title poppins-bold' >Todo App</h1>
      </div>
      <img className='background' src="/background.jpg" alt="background" />
      <CreateTodo setTodos={setTodos}/>
      <Todos todos={todos} setTodos={setTodos}  />
    </div>
  )
}

export default App
