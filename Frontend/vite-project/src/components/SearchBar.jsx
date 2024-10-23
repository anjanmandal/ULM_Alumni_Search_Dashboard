import React, { useState } from 'react';
import { Box, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name'); // Default to searching by name

  const handleSearch = () => {
    onSearch(searchField, searchTerm);  // Pass both the field and term to the parent component
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        {/* Dropdown for selecting the field to search */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth  sx={{backgroundColor:'white'}}>

            <InputLabel>Search By</InputLabel>
            <Select
              value={searchField}
              label="Search By"
              onChange={(e) => setSearchField(e.target.value)}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="graduationYear">Graduation Year</MenuItem>
              <MenuItem value="degree">Degree</MenuItem>
              <MenuItem value="occupation">Occupation</MenuItem>
              <MenuItem value="location">Location</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Input for search term */}
        <Grid item xs={12} sm={6}>
          <TextField
          sx={{backgroundColor:'white'}}
            label="Search term"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Search button */}
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" size='large' fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
