import React, { useMemo } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';
import useStyles from './styles';
import { MapProp, useAppDispatch, useAppSelector } from '../../types';
import { selectItems } from '../../redux/slices/dataSlice';
import { setChildClicked } from '../../redux/slices/itemsSlice';

const Map: React.FC<MapProp> = ({ setCoordinates, setBounds, coordinates }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { markerContainer, mapContainer, paper, pointer } = useStyles();
  const dataRestaurants = useAppSelector(selectItems);
  const isDescktop = useMediaQuery('(min-width:600px)');

  const mapRestaurants = useMemo(() => {
    return dataRestaurants?.map(({ name, photo, latitude, longitude, rating }, index) => (
      <div key={index} className={markerContainer} lat={latitude} lng={longitude}>
        {!isDescktop ? (
          <LocationOnOutlined color="primary" fontSize="large" />
        ) : (
          <Paper elevation={3} className={paper}>
            <Typography variant="subtitle2">{name}</Typography>
            <img
              className={pointer}
              alt={name}
              src={
                photo
                  ? photo.images.large.url
                  : 'https://media-cdn.tripadvisor.com/media/photo-w/0e/b0/5f/4a/caption.jpg'
              }
            />
            <Rating size="small" value={Number(rating)} readOnly />
          </Paper>
        )}
      </div>
    ));
  }, [dataRestaurants, isDescktop, markerContainer, paper, pointer]);

  return (
    <div className={mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDY1M0FDai0oHYxybuUAZ7FmIWm0LKbLa8' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        // options={}
        onChange={(event) => {
          setCoordinates({ lat: event.center.lat, lng: event.center.lng });
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
        }}
        onChildClick={(elem) => dispatch(setChildClicked(elem))}>
        {mapRestaurants}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
