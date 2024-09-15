//import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  TextField,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const ListAllOrganizations = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  const [filterPersonalityTrait, setFilterPersonalityTrait] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/user/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(
      (user) =>
        user.fname.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.lname.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter((user) => {
      const userBudget = parseFloat(user.budget); // Convert user budget to a floating point number
      const selectedBudget = parseFloat(filterBudget); // Convert selected budget filter to a floating point number
      // Handle budget comparison, including when no filter is applied
      const budgetCondition = filterBudget
        ? userBudget <= selectedBudget
        : true;
      const traitCondition = filterPersonalityTrait
        ? user.personalTrait === filterPersonalityTrait
        : true;

      return (
        (filterMajor ? user.major === filterMajor : true) &&
        (filterYear ? user.year === filterYear : true) &&
        budgetCondition &&
        traitCondition
      );
    });
  const getImageUrl = (email) => {
    const imageName = email.replace(/[@.]/g, "") + ".jpeg";
    console.log(imageName);
    // Update the path according to where your images are served from
    const imageUrl = `${process.env.PUBLIC_URL}/${imageName}`;
    return imageUrl;
  };
  return (
    <Box sx={{ flexGrow: 1, p: 2, backgroundColor: "#f4f6f9" }}>
      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allows filters to wrap to the next line if needed
          gap: 2,
          mb: 2,
        }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ flex: "1 1 200px" }} // Allows TextField to grow and shrink, minimum width of 200px
        />

        <FormControl sx={{ flex: "1 1 150px" }}>
          <InputLabel id="major-select-label">Major</InputLabel>
          <Select
            labelId="major-select-label"
            id="major-select"
            value={filterMajor}
            label="Major"
            onChange={(e) => setFilterMajor(e.target.value)}
            size="small">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem>
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Pscyhology">Pscyhology</MenuItem>
            <MenuItem value="Economics">Economics</MenuItem>
            <MenuItem value="Electrical">Electrical</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ flex: "1 1 150px" }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={filterYear}
            label="Year"
            onChange={(e) => setFilterYear(e.target.value)}
            size="small">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Freshman">Freshman</MenuItem>
            <MenuItem value="Sophomore">Sophomore</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ flex: "1 1 150px" }}>
          <InputLabel id="budget-select-label">Budget</InputLabel>
          <Select
            labelId="budget-select-label"
            id="budget-select"
            value={filterBudget}
            label="Budget"
            onChange={(e) => setFilterBudget(e.target.value)}
            size="small">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="500">Less than $500</MenuItem>
            <MenuItem value="800">Less than $800</MenuItem>
            <MenuItem value="1000">Less than $1000</MenuItem>
            <MenuItem value="1200">Less than $1200</MenuItem>
            <MenuItem value="1500">Less than $1500</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ flex: "1 1 200px" }}>
          <InputLabel id="personalTrait-select-label">Personality</InputLabel>
          <Select
            labelId="personalTrait-select-label"
            id="personalTrait-select"
            value={filterPersonalityTrait}
            label="Personality"
            onChange={(e) => setFilterPersonalityTrait(e.target.value)}
            size="small">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="ENTP">ENTP</MenuItem>
            <MenuItem value="EJFG">EJFG</MenuItem>
            <MenuItem value="INTJ">INTJ</MenuItem>
            <MenuItem value="ENTJ">ENTJ</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* User Cards Section */}
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {filteredUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  p: 2,
                  height: "auto", // Ensures height is flexible
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}>
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={getImageUrl(user.email)}
                      sx={{ width: 72, height: 72, mr: 2 }}
                      alt={`${user.fname} ${user.lname}`}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {user.fname} {user.lname}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Email: {user.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Phone: {user.phoneNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Major: {user.major}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Year: {user.year}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Budget: {user.budget}
                  </Typography>
                  <Typography variant="body2">
                    Personality Type: {user.personalTrait}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    px: 2,
                    pb: 1,
                  }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/dashboard/${user.email}`)}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export { ListAllOrganizations };
