import React, { useCallback, useMemo } from 'react';
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
  address,
  phone,
  web_url,
  website,
  rating,
  num_reviews,
}): JSX.Element => {
  const { chip, subtitle, spacing } = useStyles();

  const handleOpenSite = useCallback((input: string) => {
    window.open(input, '_blank');
  }, []);

  const adressMemo = useMemo(() => {
    if (address) {
      return (
        <Typography
          display="block"
          gutterBottom
          variant="subtitle2"
          color="textSecondary"
          className={subtitle}>
          <LocationOn />
          {address}
        </Typography>
      );
    }
  }, [address, subtitle]);

  const phoneMemo = useMemo(() => {
    if (phone) {
      return (
        <Typography
          display="block"
          gutterBottom
          variant="subtitle2"
          color="textSecondary"
          className={spacing}>
          <Phone />
          {phone}
        </Typography>
      );
    }
  }, [phone, spacing]);

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
          <Rating value={Number(rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {num_reviews} reviews
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
        {adressMemo}
        {phoneMemo}
        <CardActions>
          <Button size="small" color="primary" onClick={() => handleOpenSite(web_url)}>
            Trip Advisor
          </Button>
          <Button size="small" color="primary" onClick={() => handleOpenSite(website)}>
            Web Site
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
