import React from 'react';
import { DataFetch } from '../../types';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from '@material-ui/core';
import { LocationOn, Phone } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import useStyles from './styles';

const PlaceDetails: React.FC<DataFetch> = ({
  name,
  photo,
  price_level,
  ranking,
  awards,
  cuisine,
}): JSX.Element => {
  const { chip } = useStyles();
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          photo
            ? photo.images.large.url
            : 'https://media-cdn.tripadvisor.com/media/photo-w/0e/b0/5f/4a/caption.jpg'
        }
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {ranking}
          </Typography>
        </Box>
        {awards?.map((elem) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={elem.images.small} alt={elem.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {elem.display_name}
            </Typography>
          </Box>
        ))}
        {cuisine?.map(({ name, key }) => (
          <Chip key={key} size="small" label={name} className={chip} />
        ))}
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
