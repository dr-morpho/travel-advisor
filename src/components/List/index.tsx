import React, { useEffect, useState, createRef, RefObject, useMemo } from 'react';
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
import { useAppSelector } from '../../types';
import { selectItems } from '../../redux/slices/dataSlice';
import { selectClicked } from '../../redux/slices/itemsSlice';

interface CurrentState {
  current: number;
}

const List: React.FC<{ isLoading: boolean }> = ({ isLoading }): JSX.Element => {
  const { list, formControl, container, loading } = useStyles();
  const dataRestaurants = useAppSelector(selectItems);
  const childClicked = useAppSelector(selectClicked);
  const [type, setType] = useState<string>('resturants');
  const [rating, setRating] = useState<string>('resturants');
  const [refs, setRefs] = useState<CurrentState[]>([]);

  useEffect(() => {
    setRefs((elem) => [...Array(dataRestaurants?.length)].map((_, i) => elem[i] || createRef()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRestaurants]);

  console.log({ refs });

  const loaderElement = useMemo(() => {
    if (isLoading) {
      return (
        <div className={loading}>
          <CircularProgress size="5rem" />
        </div>
      );
    }
  }, [isLoading, loading]);

  return (
    <div className={container}>
      <Typography variant="h4" style={{ marginLeft: '0.5rem' }}>
        Resturants, Hotels, & Attractions around you
      </Typography>
      {isLoading ? (
        loaderElement
      ) : (
        <>
          <FormControl className={formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as string)}>
              <MenuItem value="resturants">Resturants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value as string)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={list}>
            {dataRestaurants?.map((elems, index) => (
              <Grid item key={index} xs={12}>
                <PlaceDetails
                  {...elems}
                  refProp={refs[index]}
                  selected={Number(childClicked) === index}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
