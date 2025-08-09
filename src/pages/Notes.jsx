import React, { useState, useEffect } from 'react'
import { Container, Box } from '@mui/material'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const url = 'http://localhost:8000/notes/'
  // json-server --watch db.json --port 8000

  useEffect(()=>{
    const fetchNotes = async () => {
      try{
        const response = await fetch(url)
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

  const handleDelete = async (id) => {
    await fetch(url + id ,{
      method: 'DELETE'
    })

    const newNotes = notes.filter((note => note.id !== id))
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
      loading? (<div>Loading...</div>) : 
      error? (<div>{error}</div>)  :
      (
        <Container maxWidth="lg" sx={{mt:5}}>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {notes.map((note) => (
              <Box key={note.id}>
                <NoteCard note={note} handleDelete={handleDelete} />
              </Box>
            ))}
          </Masonry>
        </Container>
      )
  )
}
