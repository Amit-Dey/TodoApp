/* eslint-disable react/prop-types */
import { useState } from 'react'

export function CreateTodo({ setTodos }) {
  const [title, setTitle] = useState('')

  return (
    <div className='inputBox'>
      <input className='input' name='title' onChange={e =>
        setTitle(e.target.value)
      } value={title} type='text' placeholder='Add todo'></input>

      <button className='button' onClick={() => {
        fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title })
        }).then(response => response.json())
          .then(data => {
            setTodos(data)
            setTitle('')
          })
      }} >
        <img src='/add.png' alt='add' />
      </button>

    </div>
  )
}
