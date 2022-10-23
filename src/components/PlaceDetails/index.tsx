import React from 'react';
import { PlaceDetailsProp } from '../../types';

const PlaceDetails: React.FC<PlaceDetailsProp> = ({ place }): JSX.Element => {
  return <h1>{place.name}</h1>;
};

export default PlaceDetails;
