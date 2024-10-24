// SearchBar.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SearchBar = ({ onSearch }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name'); // Default to searching by name

  const handleSearch = () => {
    onSearch(searchField, searchTerm); // Pass both the field and term to the parent component
  };

  return (
    <Box sx={{ mb: theme.spacing(4) }}>
      <Grid container spacing={2}>
        {/* Dropdown for selecting the field to search */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ backgroundColor: theme.palette.background.paper }}>
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
            sx={{ backgroundColor: theme.palette.background.paper }}
            label="Search term"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Search button */}
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              height: '100%',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
