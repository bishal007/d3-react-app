import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Grid,
} from "@mui/material";
import useStore from "../store";
import ChartSelector from "./ChartSelector";
import ChartDisplay from "./ChartDisplay";

const HomePage = () => {
  const { users, addUser, setShowData, selectedCharts } = useStore();
  const [newUser, setNewUser] = useState("");

  const handleAddUser = () => {
    if (newUser.trim()) {
      addUser({ name: newUser.trim(), detailsFilled: false });
      setNewUser("");
    }
  };

  const handleShowData = () => {
    setShowData(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        D3 React App
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <ChartSelector />
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add User
            </Typography>
            <TextField
              fullWidth
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter user name"
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUser}
              fullWidth
            >
              Add User
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <ChartDisplay />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleShowData}
              fullWidth
              sx={{ mt: 2 }}
              disabled={selectedCharts.length === 0}
            >
              Show Data
            </Button>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User List
            </Typography>
            <List>
              {users.map((user) => (
                <ListItem key={user.name} divider>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction>
                    <Button
                      component={Link}
                      to={`/user/${user.name}`}
                      variant="outlined"
                      color={user.detailsFilled ? "success" : "primary"}
                    >
                      {user.detailsFilled ? "Edit Details" : "Fill Details"}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
