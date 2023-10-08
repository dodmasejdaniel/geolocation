import { Geolocation, Position } from '@capacitor/geolocation';
import { AppThunk, RootState } from '../../app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GeoLocationInformation {
  latitude: number;
  longitude: number;
}

export interface GeoLocationState {
  value?: GeoLocationInformation;
}

const initialState: GeoLocationState = {
  value: undefined
};

export const fetchLocation = (): AppThunk => (dispatch => {
  Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position: Position) => {
    if (position) {
      const updatedPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      dispatch(update(updatedPosition));
    }
  }).catch(console.error);
});

export const geoLocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<GeoLocationInformation>) => {
      state.value = {
        latitude: action.payload.latitude, longitude: action.payload.longitude
      };
    }
  }
});

export const { update } = geoLocationSlice.actions;
export const selectLocation = (state: RootState) => state.geoLocation.value;
export default geoLocationSlice.reducer;
