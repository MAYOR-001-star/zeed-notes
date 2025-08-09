import React, { useState } from 'react';
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import { useNavigate} from 'react-router-dom';

export default function Create() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('money');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const titleIsEmpty = !title.trim();
    const detailsIsEmpty = !details.trim();

    setTitleError(titleIsEmpty);
    setDetailsError(detailsIsEmpty);

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, details, category})
      }).then(()=> navigate('/'))

      setTimeout(() => {
        setTitle('');
        setDetails('');
        setCategory('money');
        setTitleError(false);
        setDetailsError(false);
      }, 1500);
    }
  };
  
  const commonStyles = {
    margin: '20px 0',
    display: 'block',
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
          sx={{ ...commonStyles }}
        />

        <TextField
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          error={detailsError}
          sx={{ ...commonStyles }}
        />

        <FormControl sx={{ ...commonStyles }}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="money"
              control={<Radio color="secondary" />}
              label="Money"
            />
            <FormControlLabel
              value="todos"
              control={<Radio color="secondary" />}
              label="Todos"
            />
            <FormControlLabel
              value="reminders"
              control={<Radio color="secondary" />}
              label="Reminders"
            />
            <FormControlLabel
              value="work"
              control={<Radio color="secondary" />}
              label="Work"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<ChevronRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
