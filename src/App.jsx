  import { useState, useEffect, use }  from 'react'

  const App = () => {

  // State to hold the list of todos and the current input value
  const [todos, setTodos] = useState(() => { 

    // Retrieve todos items from local storage if available
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    // Save todos to local storage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  const [input, setInput] = useState('')

  // Function to add a new todo item
  const addTodo = () => {
    if (input.trim() === '') return
    setTodos([...todos, {id: Date.now(), text: input, completed: false}])
    setInput('')
  }
  return (
    // Container for the app
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-emerald-600'>
      <div className='bg-white p-8 rounded-3xl shadow-lg  '>
        <h1 className='text-2xl font-bold text-center text-gray-920 mb-6'> TODO LIST ✅</h1>
        <div className='flex items-center mb-4'>
          <input value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Add a new todo items...'
            className='flex-grow border border rounded-l-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            
          />

          {/* Button to add a new todo item */}
          <button 
            onClick={addTodo} className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200 '>
            Add
          </button>
        </div>

        {/* List of todo items */}
        <ul className='space-y-2'>
          {todos.map((todo) => (
            <li key={todo.id} className='flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200'>
              <input type='checkbox' checked={todo.completed} onChange={() => setTodos(todos.map(t => t.id === todo.id ? {...t, completed: !t.completed} : t))} className='mr-2 h-5 w-5 text-blue-600' />
              <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{todo.text}</span>
           
            {/* Button to delete a todo item */}
              <button onClick={() => setTodos(todos.filter(t => t.id !== todo.id))} className='text-white hover:bg-red-500 ml-2 border-none transition duration-200 bg-red-500 p-2 py-1 rounded-lg'>
              Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
      
    </div>
  )
}

export default App