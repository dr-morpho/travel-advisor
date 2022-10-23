import React from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails';

const List: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [type, setType] = React.useState<string>('resturants');
  const [rating, setRating] = React.useState<string>('resturants');

  const places = [
    { name: 'Cool Place' },
    { name: 'Best Beer' },
    { name: 'Best Steak' },
    { name: 'Cool Place' },
    { name: 'Best Beer' },
    { name: 'Best Steak' },
  ];

  return (
    <div className={classes.container}>
      <Typography variant="h4" style={{ marginLeft: '0.5rem' }}>
        Resturants, Hotels, & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as string)}>
          <MenuItem value="resturants">Resturants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value as string)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((elem, index) => (
          <Grid item key={index} xs={12}>
            <PlaceDetails place={elem} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
