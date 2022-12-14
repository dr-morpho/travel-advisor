import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { Header, Map, List } from './components';
import { useAppDispatch } from './types';
import { fetchData } from './utils/fetchData';

const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } });
  const [loading, setLoading] = useState<boolean>(false);

  console.log({ loading });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchData(bounds)).then(() => setLoading(false));
  }, [dispatch, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List isLoading={loading} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
