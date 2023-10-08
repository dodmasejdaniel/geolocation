import styles from './GeoLocation.module.css';
import { useEffect, useState } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchLocation, selectLocation } from './geoLocationSlice';

export const GeoLocation = () => {
  const position = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);

  const handleGetCurrentPosition = (): void => {
    setTimeout(() => {
      dispatch(fetchLocation());
    }, 2000);
  };

  return (
    <>
      <div className={styles.column}>
        {position &&
          <div>{position.latitude} {position.longitude}</div>
        }
        <button
          className={styles.button}
          type={'button'}
          onClick={handleGetCurrentPosition}
        >
          Get current position
        </button>
      </div>
    </>
  );
};
