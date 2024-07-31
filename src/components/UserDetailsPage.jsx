import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Slider, Button, Box, Paper } from '@mui/material';
import useStore from '../store';

const UserDetailsPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { updateUserData, users } = useStore();
  const [userData, setUserData] = useState({ mood: 5, work: 5, life: 5, food: 5 });

  useEffect(() => {
    const user = users.find(u => u.name === name);
    if (user && user.detailsFilled) {
      setUserData({
        mood: user.mood || 5,
        work: user.work || 5,
        life: user.life || 5,
        food: user.food || 5
      });
    }
  }, [name, users]);

  const handleChange = (key) => (event, newValue) => {
    setUserData({ ...userData, [key]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(name, userData);
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Details: {name}
        </Typography>
        <form onSubmit={handleSubmit}>
          {Object.entries(userData).map(([key, value]) => (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography id={`${key}-slider`} gutterBottom>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
              <Slider
                value={value}
                onChange={handleChange(key)}
                aria-labelledby={`${key}-slider`}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
              />
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UserDetailsPage;