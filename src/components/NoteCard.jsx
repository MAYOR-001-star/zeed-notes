import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Typography, Avatar } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { yellow, blue, green, pink } from '@mui/material/colors';

const NoteCard = ({note, handleDelete}) => {
  return (
    <div>
      <Card sx={{width: '100%', marginBottom: 2}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: note.category === 'money' ? green[500] : note.category === 'todos' ? pink[500] : note.category === 'work' ? yellow[700] : blue[700] }}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={()=>handleDelete(note.id)}>
                <DeleteOutlined />
            </IconButton>
          }
            title={note.title}
            subheader={note.category}  
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {note.details}
            </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoteCard
