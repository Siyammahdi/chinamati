import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export default function SupabaseDemo() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getTodos() {
      try {
        const { data: todos, error } = await supabase.from('todos').select()
        if (error) throw error
        if (todos) setTodos(todos)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getTodos()
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Supabase Todos Demo</h2>
        
        {loading && <p className="text-neutral-500">Loading todos...</p>}
        {error && <p className="text-rose-500">Error: {error}</p>}
        
        {!loading && !error && todos.length === 0 && (
          <p className="text-neutral-500">No todos found in your Supabase table.</p>
        )}

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li 
              key={todo.id} 
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-neutral-900">{todo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
