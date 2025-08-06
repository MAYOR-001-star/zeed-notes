import React, { useState, useEffect } from 'react'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () => {
      try{
        const response = await fetch('http://localhost:8000/notes')
        if(!response.ok) setError('Failed to fetch notes')
        const data = await response.json()
        setNotes(data)
      }catch(err){
        setError(err.message)
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()
  },[])

  return (
      loading? (<div>Loading...</div>) : 
      error? (<div>{error}</div>)  :
      (
        <div>
          {notes.map((note) => (
            <p key={note.id}>{note.title}</p>
          ))}
        </div>
      )
  )
}
